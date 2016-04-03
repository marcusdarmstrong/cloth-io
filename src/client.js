import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';
import { fromJS } from 'immutable';
import io from 'socket.io-client';
import * as actions from './actions';
import App from './components/app';

const state = fromJS(window.__INITIAL_STATE__);
const store = createStore(reducer, state);

const socketName = state.get('socket');
if (socketName) {
  const socket = io(socketName, { 'force new connection': true });
  socket.on('connect', () => store.dispatch({ type: 'SOCKET_CONNECT' }));
  const bindAction = actionName => data => store.dispatch({ type: actionName, comment: data });

  for (const action in actions) {
    if (actions.hasOwnProperty(action) && (typeof action) === 'string') {
      socket.on(action, bindAction(action));
    }
  }
  window.socket = socket;
}

ReactDOM.render(
  <App store={store} />,
  document.getElementById('react-container')
);
