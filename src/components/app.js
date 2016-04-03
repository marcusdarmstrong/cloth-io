import React from 'react';
import { Provider } from 'react-redux';
import Route from './route';
import Router from './router';
import Post from './post';
import Home from './home';
import Share from './share';

const App = ({ store }) =>
  (<Provider store={store}>
    <Router>
      <Route name="Post">
        <Post />
      </Route>
      <Route name="Share">
        <Share />
      </Route>
      <Route name="Home">
        <Home />
      </Route>
    </Router>
  </Provider>);

App.propTypes = {
  store: React.PropTypes.object,
};

export default App;
