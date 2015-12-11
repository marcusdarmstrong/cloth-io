import React from 'react';
import ContentEditable from './content-editable';
import fetch from 'isomorphic-fetch';

class AddCommentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  addComment() {
    fetch('/api/addComment', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        comment: this.state.value,
        parentId: (this.props.parentComment) ? this.props.parentComment.id : null,
        postId: (this.props.parentComment) ? this.props.parentComment.post_id : this.props.postId,
      }),
    }).then(res => res.json())
      .then(data => {
        if (data.success) {
          if (this.props.onSubmission) {
            this.props.onSubmission();
          }
          this.setState({value: ''});
        }
      });
  }

  render() {
    const {user, parentComment, fork} = this.props;
    const color = (user) ? '#' + user.color : '#ddd';
    const letter = (user) ? user.name.substr(0, 1).toUpperCase() : '?';
    const avatar = (<div className="avatar" style={{backgroundColor: color}}>{letter}</div>);
    let className = 'add-comment-box';
    if (fork) {
      className += ' fork';
    } else if (parentComment) {
      className += ' child';
    }

    const body = (user) ? (
      <div className="add-comment-container">
        <div className="comment-header">
          <div className="author-name">
            {user.name}
          </div>
        </div>
        <div className="textarea-container">
          <ContentEditable onChange={this.handleChange.bind(this)} html={this.state.value} />
          <input type="hidden" name="parentId" value={(parentComment) ? parentComment.id : ''} />
        </div>
        <div className="comment-options">
          <div className="button pull-right" onClick={this.addComment.bind(this)}>Post Comment</div>
        </div>
      </div>
    ) : (
      <div className="add-comment-container">
        <div className="comment-login-cta">
          <div className="button" onClick={this.props.openModal.bind(this, 'login')}>Log in to comment</div>
        </div>
      </div>
    );

    return (
      <div className={className}>
        <div className="author">{avatar}</div>
        {body}
      </div>
    );
  }
}

AddCommentBox.propTypes = {
  user: React.PropTypes.shape({
    color: React.PropTypes.string,
    name: React.PropTypes.string,
  }),
  parentComment: React.PropTypes.shape({
    id: React.PropTypes.string,
    post_id: React.PropTypes.string,
  }),
  fork: React.PropTypes.bool,
  openModal: React.PropTypes.func.isRequired,
  onSubmission: React.PropTypes.func,
  postId: React.PropTypes.string,
};

export default AddCommentBox;
