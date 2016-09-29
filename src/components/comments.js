// @flow

import React from 'react';
import AddCommentBox from './add-comment-box';
import Comment from './comment';
import HiddenComment from './hidden-comment';

import type { Post } from '../entities/post';
import type { User } from '../entities/user';
import type { DisplayableComment } from '../entities/displayable-comment';

type Props = {
  post: Post,
  user?: User,
  comments: DisplayableComment[],
  socket: {
    connected: boolean,
    received: string[],
  },
  openModal: () => void,
  minimizeComment: () => void,
  maximizeComment: () => void,
};

export default
  ({ post, user, comments, openModal, socket, minimizeComment, maximizeComment }: Props) => (
    <section className="comments">
      <div className="comment-summary">
        <h2>{comments.length} {(comments.length === 1) ? 'Comment' : 'Comments'}</h2>
        <AddCommentBox
          user={user} openModal={openModal} postId={post.id}
          socketConnected={socket.connected} received={socket.received}
        />
      </div>
      <div className="separator">&middot;&nbsp;&middot;&nbsp;&middot;</div>
      {comments.map((comment) => {
        if (comment.hidden) {
          return null;
        } else if (comment.minimized) {
          return (<HiddenComment
            key={comment.id} comment={comment}
            maximizeComment={maximizeComment}
          />);
        }
        return (<Comment
          key={comment.id} comment={comment} user={user} openModal={openModal}
          socketConnected={socket.connected} received={socket.received}
          minimizeComment={minimizeComment}
        />);
      })}
    </section>
  );
