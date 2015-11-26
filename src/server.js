import express from 'express';
import path from 'path';
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

