process.env.TZ = 'America/New_York';

import 'babel-polyfill';
import express from 'express';
import path from 'path';
import SocketIO from 'socket.io';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';

import layout from './layout';
import routes from './route-handlers';
import binder from './components/binder';
import components from './components';
import reducer from './reducer';

import addPost from './api/add-post';
import addComment from './api/add-comment';
import createAccount from './api/create-account';
import login from './api/login';
import signOut from './api/sign-out';
import isEmailAvailable from './api/is-email-available';
import isNameAvailable from './api/is-name-available';

const namespaces = [];
const app = express();
app.set('port', (process.env.PORT || 5000));
const server = app.listen(app.get('port'));
const io = SocketIO.listen(server);

app.use(compression());

app.use('/public', express.static(path.join(__dirname, '..', 'public'), {
  maxAge: 1000 * 60 * 60 * 24 * 365,
}));

app.use(favicon(__dirname + '/../public/favicon.ico'));
app.use(cookieParser());
app.use(bodyParser.json());

app.post('/api/addPost', addPost);
app.post('/api/addComment', addComment);
app.post('/api/createAccount', createAccount);
app.post('/api/login', login);

app.get('/api/signOut', signOut);
app.get('/api/isEmailAvailable', isEmailAvailable);
app.get('/api/isNameAvailable', isNameAvailable);

// The following doesn't work. it also doesn't really even make sense.
Object.keys(routes).forEach(route => {
  app.get(route, async (req, res) => {
    try {
      const { state, componentName } = await routes[route](req);
      if (state.socket && state.socket.namespace) {
        namespaces.push(io.of(state.get('socket')));
      }

      const component = binder(components[componentName]);
      const store = createStore(reducer, state);
      res.send(
        layout(
          state.title,
          ReactDOMServer.renderToString(
            <Provider store={store}>
              {React.createElement(component)}
            </Provider>
          ),
          state
        )
      );
    } catch (e) {
      console.log('FAILED TO BUILD STATE');
      console.log(JSON.stringify(e));
      res.status(500).send('Something broke!');
    }
  });
});
