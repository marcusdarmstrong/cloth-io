import React from 'react';
import Headline from './headline';

const Posts = ({ posts, nextPage, prevPage }) => {
  let firstPost = true;

  let prevLink = undefined;
  if (typeof prevPage !== 'undefined') {
    prevLink = (prevPage === 0) ? '/' : `?page=${prevPage}`;
  }
  const nextLink = (nextPage) ? `?page=${nextPage}` : undefined;

  return (
    <div className="headlines">
      {posts.map(post => {
        const retval = <Headline key={post.id} post={post} hasSeparator={!firstPost} />;
        firstPost = false;
        return retval;
      })}
      <div className="time-nav-container">
        {prevLink ?
          <a className="button pull-right" href={prevLink}>Newer Posts</a> : null}
        {nextLink ?
          <a className="button" href={nextLink}>Older Posts</a> : null}
      </div>
    </div>
  );
};

Posts.propTypes = {
  posts: React.PropTypes.arrayOf(
    Headline.propTypes.post
  ),
  nextPage: React.PropTypes.number,
  prevPage: React.PropTypes.number,
};

export default Posts;
