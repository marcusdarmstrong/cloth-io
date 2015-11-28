import express from 'express';
import path from 'path';
import { native as pg } from 'pg';
import SocketIO from 'socket.io';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { List as list, Map as map } from 'immutable';
import { Provider } from 'react-redux';

import layout from './layout';
import sql from './sql';
import commentOrdering from './comment-ordering';
import App from './components/app';
import reducer from './reducer';

const app = express();
app.set('port', (process.env.PORT || 5000));
const server = app.listen(app.get('port'));
SocketIO.listen(server);


app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.send(layout('Hi', 'Hello World'));
});

const articleMatcher = /\/p\/(.+)/;
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
          const user = 'Marcus';
          const state = map({post, comments, user});
          const store = createStore(reducer, state);

          res.send(layout(post.title, ReactDOMServer.renderToString(
            <Provider store={store}>
              <App />
            </Provider>
          ), state));
        });
      }
    });
  });
});
