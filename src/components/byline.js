import React from 'react';
import TimeAgo from './time-ago';
import previewer from '../util/previewer';

// This is pretty poorly named. I should work on the dom structure here.
const Byline = ({ post }) => {
  const { body, commentCount, created, user } = post;
  const preview = previewer(body);
  let commentCountText = 'Read More';
  if (commentCount === 1) {
    commentCountText = '1 Comment';
  } else if (commentCount > 1) {
    commentCountText = `${commentCount} Comments`;
  }

  return (
    <div className="byline">
      <TimeAgo timestamp={created} />
      <div className="byline-name">{user.name}</div>
      <p className="headline-preview" dangerouslySetInnerHTML={{ __html: preview }}></p>
      <div className="comment-count">{commentCountText}</div>
    </div>
  );
};

Byline.propTypes = {
  post: React.PropTypes.shape({
    body: React.PropTypes.string.isRequired,
    commentCount: React.PropTypes.number.isRequired,
    created: React.PropTypes.number.isRequired,
    user: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
    }),
  }),
};

export default Byline;
