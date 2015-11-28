import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { createStore } from 'redux';
import reducer from './reducer';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

const state = fromJS(window.__INITIAL_STATE__);
const store = createStore(reducer, state);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-container')
);
