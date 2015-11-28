import React from 'react';
import ReactDOM from 'react-dom';
import Post from './components/post';
import { createStore } from 'redux';
import reducer from './reducer';
import { Provider } from 'react-redux';

const store = createStore(reducer, window.__INITIAL_STATE__);

ReactDOM.render(
  <Provider store={store}>
    <Post />
  </Provider>,
  document.getElementById('react-container')
);
