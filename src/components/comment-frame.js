import React from 'react';
import Avatar from './avatar';
import Bubble from './bubble';
import cs from '../util/classes';

const CommentFrame = ({ isReply, hasReplies, fork, user, onAvatarClick, classNames, children }) => {
  let className = 'comment-frame';
  if (hasReplies) {
    className += ' has-replies';
  }
  if (fork) {
    className += ' fork';
  } else if (isReply) {
    className += ' child';
  }

  return (
    <div className={cs(className, classNames)}>
      <div className="author">
        {(user) ?
          <Avatar user={user} onClick={onAvatarClick} />
          :
          <Bubble letter="?" hex="ddd" onClick={onAvatarClick} />
        }
      </div>
      <div className="comment-container">
        {children}
      </div>
    </div>
  );
};

CommentFrame.propTypes = {
  isReply: React.PropTypes.bool,
  hasReplies: React.PropTypes.bool,
  fork: React.PropTypes.bool,
  user: Avatar.propTypes.user,
  children: React.PropTypes.any,
  classNames: React.PropTypes.arrayOf(React.PropTypes.string),
  onAvatarClick: React.PropTypes.func,
};

export default CommentFrame;
