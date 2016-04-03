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
    nextPage: React.PropTypes.number,
    prevPage: React.PropTypes.number,
  };

  render() {
    let firstPost = true;

    let prevPage = undefined;
    if (this.props.prevPage) {
      prevPage = (this.props.prevPage === 0) ? '/' : `?page=${this.props.prevPage}`;
    }
    const nextPage = (this.props.nextPage) ? `?page=${this.props.nextPage}` : undefined;

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
          {prevPage ?
            <a className="button pull-right" href={prevPage}>Newer Posts</a> : null}
          {nextPage ?
            <a className="button" href={nextPage}>Older Posts</a> : null}
        </div>
      </div>
    );
  }
}
