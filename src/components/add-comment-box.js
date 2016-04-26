import React from 'react';
import ContentEditable from './content-editable';
import CommentFrame from './comment-frame';
import Button from './button';
import CommentHeader from './comment-header';
import fetch from 'isomorphic-fetch';

export default class AddCommentBox extends React.Component {
  static propTypes = {
    user: React.PropTypes.shape({
      color: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
    }),
    parentComment: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
    }),
    fork: React.PropTypes.bool,
    openModal: React.PropTypes.func.isRequired,
    onSubmission: React.PropTypes.func,
    postId: React.PropTypes.number.isRequired,
    socketConnected: React.PropTypes.bool.isRequired,
    clientId: React.PropTypes.string,
  };

  state = {
    value: '',
    sending: false,
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  addComment = () => {
    this.setState({ sending: true });
    fetch('/api/addComment', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        comment: this.state.value,
        parentId: (this.props.parentComment) ? this.props.parentComment.id : null,
        postId: this.props.postId,
        clientId: this.props.clientId,
      }),
    }).then(res => res.json())
      .then(data => {
        if (data.success) {
          if (this.props.onSubmission) {
            this.setState({ value: '', sending: false }, this.props.onSubmission);
          } else {
            this.setState({ value: '', sending: false });
          }
        }
      });
  };

  openLoginModal = () => this.props.openModal('login');

  render() {
    const { user, parentComment, fork, socketConnected } = this.props;

    const disabledCopy = (this.state.sending) ? 'Sending...' : 'Connecting...';
    const postButton = (socketConnected && !this.state.sending) ?
          (<Button classNames="pull-right" onClick={this.addComment}>Post Comment</Button>)
          :
          (<Button classNames="pull-right">{disabledCopy}</Button>);

    return (user) ? (
      <CommentFrame
        user={user}
        fork={fork}
        isReply={!!parentComment}
        classNames={'add-comment'}
      >
        <CommentHeader name={user.name} />
        <div className="textarea-container">
          <ContentEditable
            onChange={this.handleChange}
            html={this.state.value}
            autoFocus={(!!parentComment)}
          />
        </div>
        <div className="comment-options">{postButton}</div>
      </CommentFrame>
    ) : (
      <CommentFrame
        fork={fork}
        isReply={!!parentComment}
        classNames={['add-comment']}
      >
        <Button onClick={this.openLoginModal}>Log in to comment</Button>
      </CommentFrame>
    );
  }
}
