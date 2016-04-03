import React from 'react';
import { Provider } from 'react-redux';
import Route from './route';
import Post from './post';
import Home from './home';
import Share from './share';
import binder from './binder';

const BoundPost = binder(Post);
const BoundShare = binder(Share);
const BoundHome = binder(Home);

const App = ({ store }) =>
  (<Provider store={store}>
    <div>
      <Route name="Post">
        <BoundPost />
      </Route>
      <Route name="Share">
        <BoundShare />
      </Route>
      <Route name="Home">
        <BoundHome />
      </Route>
    </div>
  </Provider>);

App.propTypes = {
  store: React.PropTypes.object,
};

export default App;
