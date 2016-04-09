import React from 'react';
import { Provider } from 'react-redux';
import Route from './route';
import Post from './post';
import Home from './home';
import ShareForm from './share-form';
import Frame from './frame';
import Comments from './comments';
import binder from './binder';

const BoundPost = binder(Post);
const BoundHome = binder(Home);
const BoundFrame = binder(Frame);
const BoundComments = binder(Comments);

const App = ({ store }) =>
  (<Provider store={store}>
    <div>
      <Route name="Post">
        <BoundFrame>
          <BoundPost />
          <BoundComments />
        </BoundFrame>
      </Route>
      <Route name="Share">
        <BoundFrame noShareForm>
          <ShareForm />
        </BoundFrame>
      </Route>
      <Route name="Home">
        <BoundFrame>
          <BoundHome />
        </BoundFrame>
      </Route>
    </div>
  </Provider>);

App.propTypes = {
  store: React.PropTypes.object,
};

export default App;
