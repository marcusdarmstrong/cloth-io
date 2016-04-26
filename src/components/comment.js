import React from 'react';
import AddCommentBox from './add-comment-box';
import CommentFrame from './comment-frame';
import CommentHeader from './comment-header';
import CommentIndent from './comment-indent';
import Button from './button';
import guid from '../util/guid';

export default class Comment extends React.Component {
  static propTypes = {
    comment: React.PropTypes.shape({
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
    }).isRequired,
    user: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired,
    }),
    openModal: React.PropTypes.func.isRequired,
    socketConnected: React.PropTypes.bool.isRequired,
    minimizeComment: React.PropTypes.func.isRequired,
    received: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  };

  state = {
    commentBox: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.commentBox && nextProps.received.indexOf(this.state.commentBox) !== -1) {
      this.setState({ commentBox: false });
    }
  }

  minimize = () => {
    this.props.minimizeComment(this.props.comment.id);
    fetch('/api/minimizeComment', {
      method: 'post',
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

  toggleReplyBox = () => {
    if (this.props.user) {
      if (this.state.commentBox) {
        this.setState({ commentBox: false });
      } else {
        this.setState({ commentBox: guid() });
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
            isReply={this.props.comment.child}
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
              postId={this.props.comment.post_id} openModal={this.props.openModal}
              onSubmission={this.toggleReplyBox} socketConnected={this.props.socketConnected}
              key={this.state.commentBox} fork={this.props.comment.hasReplies}
              clientId={this.state.commentBox}
            />
          }
        </div>
      </CommentIndent>
    );
  }
}
