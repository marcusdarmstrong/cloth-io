import React from 'react';
import Headline from './headline';

class Posts extends React.Component {
  render() {
    return (
      <div className="headlines">
        {this.props.posts.map(post => (<Headline post={post} />))}
      </div>
    );
  }
}

Posts.propTypes = {
  posts: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      urlstring: React.PropTypes.string,
      title: React.PropTypes.string,
    })
  ),
};

export default Posts;
