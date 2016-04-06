import React from 'react';
import Avatar from './avatar';

export default class HiddenComment extends React.Component {
  static propTypes = {
    comment: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      user: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        color: React.PropTypes.string.isRequired,
      }).isRequired,
      nestLevel: React.PropTypes.number.isRequired,
      fork: React.PropTypes.bool,
      child: React.PropTypes.bool,
      descendents: React.PropTypes.number.isRequired,
    }).isRequired,
    maximizeComment: React.PropTypes.func.isRequired,
  };

  maximize = () => {
    this.props.maximizeComment(this.props.comment.id);
    fetch('/api/maximizeComment', {
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

  render() {
    let classString = 'comment hidden-comment';
    if (this.props.comment.child) {
      classString += ' child';
    } else if (this.props.comment.fork) {
      classString += ' fork';
    }

    let markup = (<div className={classString}>
      <div className="author" onClick={this.maximize}>
        <Avatar name={this.props.comment.user.name} hex={this.props.comment.user.color} />
      </div>
      <div className="comment-container">
        {this.props.comment.descendents + 1} hidden {this.props.comment.descendents === 0 ?
          'comment' : 'comments'}
      </div>
    </div>);

    for (let i = this.props.comment.nestLevel; i > 0; i--) {
      markup = (<div className="reply-container"><div className="reply">{markup}</div></div>);
    }
    return markup;
  }
}
