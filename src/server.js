import express from 'express';
import path from 'path';
import { native as pg } from 'pg';
import SocketIO from 'socket.io';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { List as list, Map as map } from 'immutable';
import { Provider } from 'react-redux';
import compression from 'compression';
import bodyParser from 'body-parser';
import scrypt from 'scrypt';
import cookieParser from 'cookie-parser';

import layout from './layout';
import sql from './sql';
import commentOrdering from './comment-ordering';
import App from './components/app';
import reducer from './reducer';
import { validate, NAME_REX, EMAIL_REX, PASSWORD_REX } from './validator';
import { createAuthToken, decodeAuthToken } from './auth-token';

const app = express();
app.set('port', (process.env.PORT || 5000));
const server = app.listen(app.get('port'));
SocketIO.listen(server);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.send(layout('Hi', 'Hello World'));
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

const articleMatcher = /\/p\/(.+)/;
const renderPostPage = (res, post, comments, user) => {
  const state = map({post, comments, user, modal: null});
  const store = createStore(reducer, state);

  res.send(layout(post.title, ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  ), state));
};

app.get(articleMatcher, (req, res) => {
  const match = articleMatcher.exec(req.path);
  if (!match || match.length <= 1) {
    return res.status(404).send('Not found');
  }
  const urlString = match[1];
  pg.connect(process.env.DATABASE_URL, (pgErr, client, done) => {
    if (pgErr) {
      return res.status(500).send('Internal Server Error');
    }
    client.query(sql`select * from t_post where urlstring=${urlString}`, (err, result) => {
      done();
      if (err) {
        res.status(404).send('Not found');
      } else {
        const post = result.rows[0];
        client.query(sql`select c.*, u.name, u.color from t_comment c join t_user u on u.id = c.user_id where c.post_id=${post.id}`, (commentErr, commentResult) => {
          const comments = list(commentOrdering(commentResult.rows));
          const userId = req.cookies && decodeAuthToken(req.cookies.auth);
          if (userId) {
            client.query(sql`select u.id, u.name, u.color from t_user u where u.id=${userId}`, (userErr, userResult) => {
              renderPostPage(res, post, comments, userResult.rows[0]);
            });
          } else {
            renderPostPage(res, post, comments);
          }
        });
      }
    });
  });
});
