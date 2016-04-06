import React from 'react';
import Nav from './nav';
import Posts from './posts';

const Home = (props) => (
  <div>
    <Nav {...props} />
    <div className="spacer">
      <div className="container">
        <h1 className="intro">Today's top stories...</h1>
        <Posts posts={props.posts} nextPage={props.nextPage} prevPage={props.prevPage} />
      </div>
    </div>
  </div>
);

Home.propTypes = {
  posts: Posts.propTypes.posts,
  nextPage: React.PropTypes.number,
  prevPage: React.PropTypes.number,
};

export default Home;
