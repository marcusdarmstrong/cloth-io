import React from 'react';
import AddCommentBox from './add-comment-box';
import Comment from './comment';
import HiddenComment from './hidden-comment';

const Comments =
  ({ post, user, comments, openModal, socket, minimizeComment, maximizeComment }) => (
    <section className="comments">
      <div className="comment-summary">
        <h2>{comments.length} {(comments.length === 1) ? 'Comment' : 'Comments'}</h2>
        <AddCommentBox user={user} openModal={openModal} postId={post.id}
          socketConnected={socket.connected}
        />
      </div>
      <div className="separator">&middot;&nbsp;&middot;&nbsp;&middot;</div>
      {comments.map((comment) => {
        if (comment.hidden) {
          return null;
        } else if (comment.minimized) {
          return (<HiddenComment key={comment.id} comment={comment}
            maximizeComment={maximizeComment}
          />);
        }
        return (<Comment key={comment.id} comment={comment} user={user} openModal={openModal}
          socketConnected={socket.connected} received={socket.received}
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
    Comment.propTypes.comment
  ).isRequired,
  openModal: React.PropTypes.func.isRequired,
  socket: React.PropTypes.socket({
    connected: React.PropTypes.bool.isRequired,
    received: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  }),
  minimizeComment: React.PropTypes.func.isRequired,
  maximizeComment: React.PropTypes.func.isRequired,
};

export default Comments;
