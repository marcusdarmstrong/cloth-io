import React from 'react';
import Headline from './headline';

class Posts extends React.Component {
  render() {
    let firstPost = true;
    return (
      <div className="headlines">
        {this.props.posts.map(post => {
          const retval = (
            <Headline key={post.id} post={post} hasSeparator={!firstPost} />
          );
          firstPost = false;
          return retval;
        })}
      </div>
    );
  }
}

Posts.propTypes = {
  posts: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      urlstring: React.PropTypes.string,
      title: React.PropTypes.string,
    })
  ),
};

export default Posts;
