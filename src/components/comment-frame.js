// @flow

import React from 'react';
import Avatar from './avatar';
import Bubble from './bubble';
import type { User } from '../entities/user';

type Props = {
  isReply?: boolean,
  hasReplies?: boolean,
  fork?: boolean,
  user?: User,
  children: React.Element | React.Element[] | ?string,
  onAvatarClick?: () => void,
  className?: string,
}

export default ({ isReply, hasReplies, fork, user, onAvatarClick, className, children }: Props) => {
  let baseClass = 'comment-frame';
  if (hasReplies) {
    baseClass += ' has-replies';
  }
  if (fork) {
    baseClass += ' fork';
  } else if (isReply) {
    baseClass += ' child';
  }

  return (
    <div className={`${baseClass} ${className}`}>
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
