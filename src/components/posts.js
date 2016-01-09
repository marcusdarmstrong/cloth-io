import React from 'react';
import Headline from './headline';

export default class Posts extends React.Component {
  static propTypes = {
    posts: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string,
        urlstring: React.PropTypes.string,
        title: React.PropTypes.string,
      })
    ),
  }

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
