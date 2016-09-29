// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';
import { fromJS } from 'immutable';
import io from 'socket.io-client';
import * as actions from './actions';
import App from './components/app';

const state = fromJS(window.INITIAL_STATE);
const store = createStore(reducer, state);

const socketData = state.get('socket');
if (socketData) {
  const socketName = socketData.get('name');
  if (socketName) {
    const socket = io(socketName, { 'force new connection': true });
    socket.on('connect', () => store.dispatch({ type: 'SOCKET_CONNECT' }));
    const bindAction = actionName => data => store.dispatch({ type: actionName, comment: data });

    for (const action of Object.keys(actions)) {
      if ((typeof action) === 'string') {
        socket.on(action, bindAction(action));
      }
    }
    window.socket = socket;
  }
}

ReactDOM.render(
  <App store={store} />,
  document.getElementById('react-container')
);
