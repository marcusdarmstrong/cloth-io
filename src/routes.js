import React from 'react';
import { IndexRoute, Route } from 'react-router';
import PostDetailPage from './components/post-detail-page';
import Home from './components/home';

export default () => {
  return (
    <Route path="/">
      <IndexRoute component={Home}/>
      <Route path="/p/:urlString" component={PostDetailPage}/>
    </Route>
  );
};
