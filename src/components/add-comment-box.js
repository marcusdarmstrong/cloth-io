import React from 'react';

class AddCommentBox extends React.Component {
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
          <div className="textarea" contentEditable></div>
          <input type="hidden" name="parentId" value={(parentComment) ? parentComment.id : ''} />
        </div>
        <div className="comment-options">
          <div className="button pull-right">Post Comment</div>
        </div>
      </div>
    ) : (
      <div className="add-comment-container">
        <div className="comment-login-cta">
          <div className="button" onClick={this.openModal.bind(this, 'login')}>Log in to comment</div>
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
    id: React.PropTypes.number,
  }),
  fork: React.PropTypes.bool,
  openModal: React.PropTypes.func.isRequired,
};

export default AddCommentBox;
