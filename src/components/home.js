import React from 'react';
import Posts from './posts';

const Home = ({ posts, nextPage, prevPage }) => (
  <div>
    <h1 className="intro">Today's top stories...</h1>
    <Posts posts={posts} nextPage={nextPage} prevPage={prevPage} />
  </div>
);

Home.propTypes = {
  posts: Posts.propTypes.posts,
  nextPage: React.PropTypes.number,
  prevPage: React.PropTypes.number,
};

export default Home;
