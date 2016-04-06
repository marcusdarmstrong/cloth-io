import React from 'react';
import AddCommentBox from './add-comment-box';
import Comment from './comment';

const Comments = ({ post, user, comments, openModal,
  socketConnected, received, minimizeComment }) => (
  <section className="comments">
    <div className="comment-summary">
      <h2>{comments.length} {(comments.length === 1) ? 'Comment' : 'Comments'}</h2>
      <AddCommentBox user={user} openModal={openModal} postId={post.id}
        socketConnected={socketConnected}
      />
    </div>
    <div className="separator">&middot;&nbsp;&middot;&nbsp;&middot;</div>
    {comments.map((comment) => {
      if (comment.hidden) {
        return null;
      } else if (comment.minimized) {
        return `${comment.descendents} hidden comments`;
      }
      return (<Comment key={comment.id} comment={comment} user={user} openModal={openModal}
        socketConnected={socketConnected} received={received}
        minimizeComment={minimizeComment}
      />);
    })}
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
      id: React.PropTypes.number.isRequired,
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
      descendents: React.PropTypes.number.isRequired,
      hidden: React.PropTypes.bool,
      minimized: React.PropTypes.bool,
    })
  ).isRequired,
  openModal: React.PropTypes.func.isRequired,
  socketConnected: React.PropTypes.bool.isRequired,
  minimizeComment: React.PropTypes.func.isRequired,
  received: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default Comments;
