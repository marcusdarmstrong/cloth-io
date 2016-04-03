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
  posts: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      urlstring: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      body: React.PropTypes.string.isRequired,
      created: React.PropTypes.number.isRequired,
      commentcount: React.PropTypes.number.isRequired,
      url: React.PropTypes.string,
      name: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired,
    }),
  ),
  nextPage: React.PropTypes.number,
  prevPage: React.PropTypes.number,
};

export default Home;
