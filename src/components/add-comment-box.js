import React from 'react';

export default ({user, parentComment, fork}) => {
  const color = '#' + user.color;
  const letter = user.name.substr(0, 1).toUpperCase();
  const avatar = (<div className="avatar" style={{backgroundColor: color}}>{letter}</div>);
  const className = (fork) ? 'add-comment-box fork' : ((parentComment) ? 'add-comment-box child' : 'add-comment-box');
  return (
    <div className={className}>
      <div className="author">{avatar}</div>
      <div className="add-comment-container">
        <div className="comment-header">
          <div className="author-name">
            {user.name}
          </div>
        </div>
        <div className="textarea-container">
          <div className="textarea" contentEditable></div>
          <input type="hidden" name="parentId" value={(parentComment) ? parentComment.id : ''} />
        </div>
        <div className="comment-options">
          <div className="button pull-right">Post Comment</div>
        </div>
      </div>
    </div>
  );
};
