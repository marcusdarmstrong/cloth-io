// @flow

import React from 'react';
import AddCommentBox from './add-comment-box';
import CommentFrame from './comment-frame';
import CommentHeader from './comment-header';
import CommentIndent from './comment-indent';
import Button from './button';
import type { DisplayableComment } from '../entities/displayable-comment';
import type { User } from '../entities/user';

type Props = {
  comment: DisplayableComment,
  user?: User,
  openModal: () => void,
  socketConnected: boolean,
  minimizeComment: () => void,
  received: string[],
};

export default class Comment extends React.Component {
  state: {
    commentBox: boolean,
  } = {
    commentBox: false,
  };

  props: Props;

  minimize: () => void = () => {
    this.props.minimizeComment(this.props.comment.id);
    fetch('/api/minimizeComment', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        commentId: this.props.comment.id,
      }),
    });
  };

  toggleReplyBox: () => void = () => {
    if (this.props.user) {
      if (this.state.commentBox) {
        this.setState({ commentBox: false });
      } else {
        this.setState({ commentBox: true });
      }
    } else {
      this.props.openModal('login');
    }
  };

  render() {
    const replyNestLevel = (this.props.comment.hasReplies) ?
      this.props.comment.nestLevel + 1 : this.props.comment.nestLevel;

    return (
      <CommentIndent nestLevel={this.props.comment.nestLevel}>
        <div>
          <CommentFrame
            fork={this.props.comment.fork}
            isReply={this.props.comment.isReply}
            hasReplies={this.props.comment.hasReplies || !!this.state.commentBox}
            user={this.props.comment.user}
            onAvatarClick={this.minimize}
          >
            <CommentHeader
              name={this.props.comment.user.name}
              timestamp={this.props.comment.created}
            />
            <div
              className="comment-text"
              dangerouslySetInnerHTML={{ __html: this.props.comment.body }}
            ></div>
            {(replyNestLevel <= 4) &&
              <div className="comment-options">
                <Button
                  classNames="pull-right"
                  engaged={!!this.state.commentBox}
                  onClick={this.toggleReplyBox}
                >
                  Reply
                </Button>
              </div>
            }
          </CommentFrame>
          {(this.state.commentBox) &&
            <AddCommentBox
              user={this.props.user} parentComment={this.props.comment}
              postId={this.props.comment.postId} openModal={this.props.openModal}
              onSubmission={this.toggleReplyBox} socketConnected={this.props.socketConnected}
              key={this.state.commentBox} fork={this.props.comment.hasReplies}
              clientId={this.state.commentBox} received={this.props.received}
            />
          }
        </div>
      </CommentIndent>
    );
  }
}
