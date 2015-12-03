import React from 'react';
import Nav from './nav';
import Posts from './posts';

const Home = (props) => {
  return (
    <div>
      <Nav {...props} />
      <div className="spacer">
        <div className="container">
          <div>
            <p>Hello World! This is the homepage.</p>
            <Posts posts={props.posts} />
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  posts: React.PropTypes.arrayOf(
    React.PropTypes.object
  ),
};

export default Home;
