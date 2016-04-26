import React from 'react';
import CommentFrame from './comment-frame';
import CommentIndent from './comment-indent';

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
    const { comment } = this.props;
    const hiddenCount = comment.descendents + 1;

    return (
      <CommentIndent nestLevel={comment.nestLevel}>
        <CommentFrame
          isReply={comment.child}
          fork={comment.fork}
          classNames={'hidden-comment'}
          onAvatarClick={this.maximize}
          user={comment.user}
        >
          {hiddenCount} hidden {hiddenCount === 1 ? 'comment' : 'comments'}
        </CommentFrame>
      </CommentIndent>
    );
  }
}
