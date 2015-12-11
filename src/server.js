process.env.TZ = 'America/New_York';

import express from 'express';
import path from 'path';
import { native as pg } from 'pg';
import SocketIO from 'socket.io';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import compression from 'compression';
import bodyParser from 'body-parser';
import scrypt from 'scrypt';
import cookieParser from 'cookie-parser';
import sanitizeHtml from 'sanitize-html';

import layout from './layout';
import sql from './sql';
import reducer from './reducer';
import { validate, NAME_REX, EMAIL_REX, PASSWORD_REX, URL_REX, TITLE_REX } from './validator';
import { createAuthToken, decodeAuthToken } from './auth-token';
import router from './router';
import routes from './routes';
import loaders from './loaders';
import binder from './components/binder';

const app = express();
app.set('port', (process.env.PORT || 5000));
const server = app.listen(app.get('port'));
const io = SocketIO.listen(server);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, '..', 'public')));

router(app, loaders(routes), (component, res, state) => {
  const store = createStore(reducer, state);
  res.send(
    layout(
      state.get('title'),
      ReactDOMServer.renderToString(
        <Provider store={store}>
          {React.createElement(binder(component))}
        </Provider>
      ),
      state
    )
  );
}, (req, state, cb) => {
  pg.connect(process.env.DATABASE_URL, (pgErr, client, done) => {
    if (pgErr) {
      return cb(state);
    }
    const userId = req.cookies && decodeAuthToken(req.cookies.auth);
    if (userId) {
      client.query(sql`select u.id, u.status, u.name, u.color from t_user u where u.id=${userId}`, (userErr, userResult) => {
        done();
        if (userErr || !userResult || !userResult.rows) {
          return cb(state);
        }
        const user = userResult.rows[0];
        cb(state.set('user', {
          id: user.id,
          status: Number(user.status),
          name: user.name,
          color: user.color,
        }));
      });
    } else {
      return cb(state);
    }
  });
});

app.get('/api/isUsernameTaken', (req, res) => {
  let name = req.query.name;
  if (name && validate(NAME_REX, name)) {
    name = name.trim();
    pg.connect(process.env.DATABASE_URL, (pgErr, client, done) => {
      if (pgErr) {
        return res.status(500).send('Internal Server Error');
      }
      client.query(sql`select id from t_user where name=${name}`, (err, result) => {
        done();
        if (result && result.rows && result.rows.length === 0) {
          res.send(JSON.stringify({success: true}));
        } else {
          res.send(JSON.stringify({success: false}));
        }
      });
    });
  } else {
    res.send(JSON.stringify({success: false}));
  }
});

app.get('/api/isEmailTaken', (req, res) => {
  let email = req.query.email;
  if (email && validate(EMAIL_REX, email)) {
    email = email.trim();
    pg.connect(process.env.DATABASE_URL, (pgErr, client, done) => {
      if (pgErr) {
        return res.status(500).send('Internal Server Error');
      }
      client.query(sql`select id from t_user where email=${email}`, (err, result) => {
        done();
        if (result && result.rows && result.rows.length === 0) {
          res.send(JSON.stringify({success: true}));
        } else {
          res.send(JSON.stringify({success: false}));
        }
      });
    });
  } else {
    res.send(JSON.stringify({success: false}));
  }
});


const login = (res, id) => {
  const authToken = createAuthToken(id);
  res.cookie('auth', authToken, { maxAge: 1000 * 60 * 60 * 24 * 365 * 2, httpOnly: true });
};
app.post('/api/createAccount', (req, res) => {
  let name = req.body.name || '';
  name = name.trim();
  let email = req.body.email || '';
  email = email.trim();
  const password = req.body.password || '';

  if (!name || !validate(NAME_REX, name)) {
    return res.send(JSON.stringify({success: false, nameError: 'Invalid name'}));
  }
  if (!email || !validate(EMAIL_REX, email)) {
    return res.send(JSON.stringify({success: false, emailError: 'Invalid email'}));
  }
  if (!password || !validate(PASSWORD_REX, password)) {
    return res.send(JSON.stringify({success: false, passwordError: 'Invalid password'}));
  }

  const salt = new Buffer(name);
  const passHash = scrypt.hashSync(password, {N: 16384, r: 8, p: 1}, 64, salt).toString('hex');
  const color = passHash.substr(0, 6);

  pg.connect(process.env.DATABASE_URL, (pgErr, client, done) => {
    if (pgErr) {
      return res.status(500).send('Internal Server Error');
    }
    client.query(sql`select id from t_user where email=${email}`, (emailErr, emailResult) => {
      if (emailResult && emailResult.rows && emailResult.rows.length === 0) {
        client.query(sql`select id from t_user where name=${name}`, (userErr, userResult) => {
          if (userResult && userResult.rows && userResult.rows.length === 0) {
            client.query(sql`insert into t_user (name, email, passhash, color) values (${name}, ${email}, ${passHash}, ${color}) returning id`, (err, result) => {
              done();
              const id = result.rows[0].id;
              login(res, id);
              res.send(JSON.stringify({success: true, user: { id, name, color }}));
            });
          } else {
            res.send(JSON.stringify({success: false, nameError: 'Name is already taken.'}));
          }
        });
      } else {
        res.send(JSON.stringify({success: false, emailError: 'Email is already taken.'}));
      }
    });
  });
});

app.post('/api/login', (req, res) => {
  let email = req.body.email || '';
  email = email.trim();
  const password = req.body.password || '';

  pg.connect(process.env.DATABASE_URL, (pgErr, client, done) => {
    if (pgErr) {
      return res.status(500).send('Internal Server Error');
    }
    client.query(sql`select id, name, passhash, color from t_user where email=${email}`, (emailErr, emailResult) => {
      done();
      const user = emailResult.rows[0];
      const salt = new Buffer(user.name);
      const passHash = scrypt.hashSync(password, {N: 16384, r: 8, p: 1}, 64, salt).toString('hex');

      if (passHash === user.passhash) {
        login(res, user.id);
        res.send(JSON.stringify({success: true, user: { id: user.id, name: user.name, color: user.color }}));
      } else {
        res.send(JSON.stringify({success: false, error: 'Sorry, that password doesn\'t match'}));
      }
    });
  });
});

app.get('/api/signOut', (req, res) => {
  res.cookie('auth', '', { maxAge: 0, httpOnly: true });
  res.send(JSON.stringify({success: true}));
});


const addComment = (id, created, name, color, parentId, postId, body) => {
  io.of('/comments-' + postId).emit('ADD_COMMENT', {
    id: id,
    created: created,
    name: name,
    color: color,
    parent_id: parentId,
    post_id: postId,
    body: body,
  });
};

app.post('/api/addComment', (req, res) => {
  const userId = req.cookies && decodeAuthToken(req.cookies.auth);
  const comment = sanitizeHtml(req.body.comment, {
    allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'div' ],
    allowedAttributes: {
      'a': [ 'href' ],
    },
  });
  const parentId = req.body.parentId;
  const postId = req.body.postId;

  if (userId && comment && comment !== '') {
    pg.connect(process.env.DATABASE_URL, (pgErr, client, done) => {
      client.query(sql`select name, color from t_user where id=${userId}`, (userErr, userResult) => {
        client.query(sql`insert into t_comment (user_id, post_id, parent_id, body) values (${userId}, ${postId}, ${parentId}, ${comment}) returning id, created`, (insertErr, insertResult) => {
          done();
          if (insertResult && insertResult.rows && insertResult.rows.length === 1) {
            addComment(
              insertResult.rows[0].id,
              insertResult.rows[0].created,
              userResult.rows[0].name,
              userResult.rows[0].color,
              parentId,
              postId,
              comment
            );
            res.send(JSON.stringify({success: true}));
          } else {
            res.send(JSON.stringify({success: false}));
          }
        });
      });
    });
  }
});

app.post('/api/addPost', (req, res) => {
  const userId = req.cookies && decodeAuthToken(req.cookies.auth);
  const body = sanitizeHtml(req.body.body, {
    allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'div', 'h2', 'h3' ],
    allowedAttributes: {
      'a': [ 'href' ],
    },
  });

  const link = (validate(URL_REX, req.body.link)) ? req.body.link : null;
  const title = (validate(TITLE_REX, req.body.title)) ? req.body.title : null;
  const urlStringRoot = title.toLowerCase().replace(/ /g, '-').replace(/[^a-z-]/g, '');

  if (userId && body && body !== '') {
    pg.connect(process.env.DATABASE_URL, (pgErr, client, done) => {
      const urlStringLike = urlStringRoot + '%';
      client.query(sql`select count(*) as count from t_post where urlstring like ${urlStringLike}`, (countErr, countResult) => {
        if (countResult && countResult.rows && countResult.rows[0] && countResult.rows[0].count) {
          const urlString = (Number(countResult.rows[0].count) === 0) ? urlStringRoot : urlStringRoot + '-' + countResult.rows[0].count;
          client.query(sql`select status from t_user where id=${userId}`, (userErr, userResult) => {
            if (userResult.rows[0].status > 0) {
              client.query(sql`insert into t_post (user_id, title, urlstring, body, url) values (${userId}, ${title}, ${urlString}, ${body}, ${link}) returning id`, (insertErr, insertResult) => {
                done();
                if (insertResult && insertResult.rows && insertResult.rows.length === 1) {
                  res.send(JSON.stringify({success: true, post: { urlstring: urlString }}));
                } else {
                  res.send(JSON.stringify({success: false, message: 'insert failed'}));
                }
              });
            } else {
              res.send(JSON.stringify({success: false, message: 'No permissions'}));
            }
          });
        } else {
          res.send(JSON.stringify({success: false, message: 'Unable to generate urlstring'}));
        }
      });
    });
  } else {
    res.send(JSON.stringify({success: false, message: 'Didn\'t validate'}));
  }
});
