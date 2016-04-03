import React from 'react';
import ContentEditable from './content-editable';
import Avatar from './avatar';
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
      }),
    }).then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({ value: '', sending: false });
          if (this.props.onSubmission) {
            this.props.onSubmission();
          }
        }
      });
  };

  openLoginModal = () => this.props.openModal('login');

  render() {
    const { user, parentComment, fork, socketConnected } = this.props;

    let className = 'add-comment-box';
    if (fork) {
      className += ' fork';
    } else if (parentComment) {
      className += ' child';
    }

    const disabledCopy = (this.state.sending) ? 'Sending...' : 'Connecting...';
    const postButton = (socketConnected && !this.state.sending) ?
          (<div className="button pull-right" onClick={this.addComment}>Post Comment</div>)
          :
          (<div className="button pull-right disabled">{disabledCopy}</div>);

    const body = (user) ? (
      <div className="add-comment-container">
        <div className="comment-header">
          <div className="author-name">
            {user.name}
          </div>
        </div>
        <div className="textarea-container">
          <ContentEditable onChange={this.handleChange} html={this.state.value}
            autoFocus={(!!parentComment)}
          />
          <input type="hidden" name="parentId" value={(parentComment) ? parentComment.id : ''} />
        </div>
        <div className="comment-options">{postButton}</div>
      </div>
    ) : (
      <div className="add-comment-container">
        <div className="comment-login-cta">
          <div className="button" onClick={this.openLoginModal}>Log in to comment</div>
        </div>
      </div>
    );

    return (
      <div className={className}>
        <div className="author">
          <Avatar name={(user) ? user.name : '?'} hex={(user) ? user.color : 'ddd'} />
        </div>
        {body}
      </div>
    );
  }
}
