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
    const page = this.props.page;
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
          <a className="button pull-right" href={`?page=${page + 1}`}>Older Posts</a>
          {page > 0 ? <a className="button" href={`?page=${page - 1}`}>Newer Posts</a> : null}
        </div>
      </div>
    );
  }
}
