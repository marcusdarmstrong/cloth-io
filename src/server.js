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

app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.send(layout('Hi', App));
});

app.get(/\/p\/.*/, (req, res) => {
  pg.connect(process.env.DATABASE_URL, (pgErr, client, done) => {
    if (pgErr) {
      return res.send('Error ' + pgErr);
    }
    client.query('select * from t_post', (err) => {
      done();
      if (err) {
        res.send('Error ' + err);
      } else {
        res.send(layout('Success', App));
      }
    });
  });
});
