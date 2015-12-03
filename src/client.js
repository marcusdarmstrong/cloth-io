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
import binder from './binder';

const state = fromJS(window.__INITIAL_STATE__);
const store = createStore(reducer, state);
const socket = io();

const bindAction = actionName => {
  return data => store.dispatch({type: actionName, ...data});
};
for (const action in actions) {
  if (actions.hasOwnProperty(action) && (typeof action === 'string' || action instanceof String)) {
    socket.on(action, bindAction(action));
  }
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      {React.createElement(binder(router(routes, window.location.pathname)))}
    </div>
  </Provider>,
  document.getElementById('react-container')
);
