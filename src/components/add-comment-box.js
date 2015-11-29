import React from 'react';

export default ({user}) => {
  const color = '#' + user.color;
  const letter = user.name.substr(0, 1).toUpperCase();
  const avatar = (<div className="avatar" style={{backgroundColor: color}}>{letter}</div>);
  return (
    <div className="add-comment-box">
      <div className="author">{avatar}</div>
      <div className="add-comment-container">
        <div className="comment-header">
          <div className="author-name">
            {user.name}
          </div>
        </div>
        <div className="textarea-container">
          <div className="textarea" contentEditable></div>
        </div>
        <div className="comment-options">
          <div className="button pull-right">Post Comment</div>
        </div>
      </div>
    </div>
  );
};
