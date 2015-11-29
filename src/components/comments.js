import React from 'react';
import AddCommentBox from './add-comment-box';
import Comment from './comment';

export default ({user, comments, openModal}) => (
  <section className="comments">
    <div className="comment-summary">
      <h2>{comments.length} {(comments.length === 1) ? 'Comment' : 'Comments'}</h2>
      <AddCommentBox user={user} openModal={openModal} />
    </div>
    <div className="separator">&middot;&nbsp;&middot;&nbsp;&middot;</div>
    {comments.map((comment) =>
      <Comment key={comment.id} comment={comment} user={user} openModal={openModal} />
    )}
  </section>
);
