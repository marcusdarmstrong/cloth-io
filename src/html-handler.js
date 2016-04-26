import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import layout from './layout';
import App from './components/app';
import reducer from './reducer';
import onError from './util/on-error';
import { Map as map } from 'immutable';

const namespaces = {};

export default (io) => (handler) => onError(async (req, res) => {
  const state = map(await handler(req));

  if (state.has('socket')) {
    const socket = state.get('socket');
    if (socket.has('name')) {
      const name = socket.get('name');
      namespaces[name] = io.of(name);
    }
  }

  const store = createStore(reducer, state);
  res.send(
    layout(
      state.get('title'),
      ReactDOMServer.renderToString(<App store={store} />),
      state
    )
  );
}, (req, res) => res.status(500).send('Something broke!'));
