import React from 'react';
import ReactDOM from 'react-dom';
import PostDetailPage from './components/post-detail-page';
import { createStore } from 'redux';
import reducer from './reducer';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import io from 'socket.io-client';

const state = fromJS(window.__INITIAL_STATE__);
const store = createStore(reducer, state);

ReactDOM.render(
  <Provider store={store}>
    <PostDetailPage socket={io()} />
  </Provider>,
  document.getElementById('react-container')
);
