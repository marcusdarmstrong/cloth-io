import React from 'react';

export default ({comment}) => {
  const classString = (comment.hasReplies) ? 'comment has-replies' : 'comment';
  let markup = (<div className={classString}>
    <div className="author"><div className="avatar avatar-1">B</div></div>
    <div className="comment-container">
      <div className="comment-header">
        <div className="comment-timestamp pull-right">
          14 minutes ago
        </div>
        <div className="author-name">
          Brendan
        </div>
      </div>
      <div className="comment-text">
        <p>I think one of the more frustrating aspects of the Jets recent slump over the last five games is made more alarming by the recurring pattern behind it. Team gets off to a sluggish start, looks unprepared. At least one unit... it varies week to week... seems <strong>totally</strong> lost in space and the others cannot compensate for it.</p>
        <p>That fragility, or lack of mental toughness, surfaces, and the team falls behind early.</p>
      </div>
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
