import React from 'react';
import Headline from './headline';

export default class Posts extends React.Component {
  static propTypes = {
    posts: React.PropTypes.arrayOf(
      Headline.propTypes.post
    ),
    nextPage: React.PropTypes.number,
    prevPage: React.PropTypes.number,
  };

  render() {
    let firstPost = true;

    let prevPage = undefined;
    if (typeof this.props.prevPage !== 'undefined') {
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
