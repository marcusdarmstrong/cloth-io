import React from 'react';
import Headline from './headline';

export default class Posts extends React.Component {
  static propTypes = {
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
      })
    ),
    page: React.PropTypes.number.isRequired,
  };

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
        <div className="time-nav-container">
          {this.props.page > 0 ? <div className="button">Newer Posts</div> : null}
          <div className="button pull-right">Older Posts</div>
        </div>
      </div>
    );
  }
}
