import React from 'react';
import AddCommentBox from './add-comment-box';
import Comment from './comment';

const Comments = ({post, user, comments, openModal, socketConnected}) => (
  <section className="comments">
    <div className="comment-summary">
      <h2>{comments.length} {(comments.length === 1) ? 'Comment' : 'Comments'}</h2>
      <AddCommentBox user={user} openModal={openModal} postId={post.id} socketConnected={socketConnected} />
    </div>
    <div className="separator">&middot;&nbsp;&middot;&nbsp;&middot;</div>
    {comments.map((comment) =>
      <Comment key={comment.id} comment={comment} user={user} openModal={openModal} socketConnected={socketConnected} />
    )}
  </section>
);

Comments.propTypes = {
  post: React.PropTypes.shape({
    id: React.PropTypes.number,
  }),
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
    color: React.PropTypes.string,
  }),
  comments: React.PropTypes.array,
  openModal: React.PropTypes.func.isRequired,
  socketConnected: React.PropTypes.bool.isRequired,
};

export default Comments;
