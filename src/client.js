import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import io from 'socket.io-client';
import router from './client-router';
import routes from './routes';
import * as actions from './actions';
import binder from './components/binder';

const state = fromJS(window.__INITIAL_STATE__);
const store = createStore(reducer, state);

const socketName = state.get('socket');
if (socketName) {
  const socket = io.connect(socketName, {'force new connection': true});
  const bindAction = actionName => {
    return data => store.dispatch({type: actionName, comment: data});
  };
  for (const action in actions) {
    if (actions.hasOwnProperty(action) && (typeof action === 'string' || action instanceof String)) {
      socket.on(action, bindAction(action));
    }
  }
  socket.on('connect', () => store.dispatch({type: 'SOCKET_CONNECT'}));
}

ReactDOM.render(
  <Provider store={store}>
    {React.createElement(binder(router(routes, window.location.pathname)))}
  </Provider>,
  document.getElementById('react-container')
);
