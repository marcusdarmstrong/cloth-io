import React from 'react';

export default ({comment}) => {
  const classString = (comment.hasReplies) ? 'comment has-replies' : 'comment';
  const avatar = comment.name.charAt(0).toUpperCase();
  const avatarColor = '#' + comment.color;
  let markup = (<div className={classString}>
    <div className="author"><div className="avatar" style={{color: avatarColor}}>{avatar}</div></div>
    <div className="comment-container">
      <div className="comment-header">
        <div className="comment-timestamp pull-right">
          14 minutes ago
        </div>
        <div className="author-name">
          comment.name
        </div>
      </div>
      <div className="comment-text" dangerouslySetInnerHTML={{__html: comment.body}}></div>
      <div className="comment-options">
        <div className="button pull-right">Reply</div>
      </div>
    </div>
  </div>);

  for (let i = comment.nestLevel; i > 0; i--) {
    markup = (<div className="reply">{markup}</div>);
  }
  return markup;
};
