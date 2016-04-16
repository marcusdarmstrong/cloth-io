import React from 'react';
import TimeAgo from './time-ago';

const CommentHeader = ({ name, timestamp }) =>
  <div className="comment-header">
    {(timestamp) ? <TimeAgo timestamp={timestamp} /> : null}
    <div className="author-name">
      {name}
    </div>
  </div>
;

CommentHeader.propTypes = {
  name: React.PropTypes.string.isRequired,
  timestamp: React.PropTypes.number,
};

export default CommentHeader;
