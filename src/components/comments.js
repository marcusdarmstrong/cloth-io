import React from 'react';
import AddCommentBox from './add-comment-box';
import Comment from './comment';

const Comments = ({ post, user, comments, openModal, socketConnected, received }) => (
  <section className="comments">
    <div className="comment-summary">
      <h2>{comments.length} {(comments.length === 1) ? 'Comment' : 'Comments'}</h2>
      <AddCommentBox user={user} openModal={openModal} postId={post.id}
        socketConnected={socketConnected}
      />
    </div>
    <div className="separator">&middot;&nbsp;&middot;&nbsp;&middot;</div>
    {comments.map((comment) =>
      <Comment key={comment.id} comment={comment} user={user} openModal={openModal}
        socketConnected={socketConnected} received={received}
      />
    )}
  </section>
);

Comments.propTypes = {
  post: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
  }).isRequired,
  user: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    color: React.PropTypes.string.isRequired,
  }),
  comments: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      user: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        color: React.PropTypes.string.isRequired,
      }).isRequired,
      created: React.PropTypes.number.isRequired,
      body: React.PropTypes.string.isRequired,
      nestLevel: React.PropTypes.number.isRequired,
      post_id: React.PropTypes.number.isRequired,
      hasReplies: React.PropTypes.bool,
      fork: React.PropTypes.bool,
      child: React.PropTypes.bool,
    })
  ).isRequired,
  openModal: React.PropTypes.func.isRequired,
  socketConnected: React.PropTypes.bool.isRequired,
  received: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default Comments;
