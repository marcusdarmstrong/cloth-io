import React from 'react';

export default () => (
  <div className="add-comment-box">
    <div className="author"><div className="avatar avatar-4">M</div></div>
    <div className="add-comment-container">
      <div className="comment-header">
        <div className="author-name">
          Marcus
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
