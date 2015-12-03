import React from 'react';
import Nav from './nav';

const Home = (props) => {
  return (
    <div>
      <Nav {...props} />
      <div className="spacer">
        <div className="container">
          <div>
            <p>Hello World! This is the homepage.</p>
            {props.posts.map(post => (<a href={'/p/' + post.urlstring}>{post.title}</a>))}
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  posts: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      urlstring: React.PropTypes.string,
      title: React.PropTypes.string,
    })
  ),
};

export default Home;
