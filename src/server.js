import express from 'express';
import path from 'path';
import { native as pg } from 'pg';
const app = express();

app.set('port', (process.env.PORT || 5000));
const server = app.listen(app.get('port'));

import SocketIO from 'socket.io';

SocketIO.listen(server);

import App from './app';
import layout from './layout';
import sql from './sql';
import Post from './components/post';
import React from 'react';

app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.send(layout('Hi', App));
});

const articleMatcher = /\/p\/(.+)/;
app.get(articleMatcher, (req, res) => {
  const match = articleMatcher.exec(req.path);
  if (match && match.length > 1) {
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
          res.send(layout('Success', React.renderToString(<Post post={result.rows[0]} />)));
        }
      });
    });
  } else {
    res.status(404).send('Not found');
  }
});
