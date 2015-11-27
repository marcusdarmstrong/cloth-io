import express from 'express';
import path from 'path';
import { native as pg } from 'pg';
import SocketIO from 'socket.io';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import layout from './layout';
import sql from './sql';
import commentOrdering from './comment-ordering';
import Post from './components/post';


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
          const comments = commentOrdering(commentResult.rows);
          res.send(layout(post.title, ReactDOMServer.renderToString(<Post post={post} comments={comments} />)));
        });
      }
    });
  });
});
