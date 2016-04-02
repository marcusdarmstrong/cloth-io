import React from 'react';
import TimeAgo from './time-ago';
import AddCommentBox from './add-comment-box';
import Avatar from './avatar';

export default class Comment extends React.Component {
  static propTypes = {
    comment: React.PropTypes.shape({
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
  };

  state = {
    commentBoxExpanded: false,
  };

  toggleReplyBox = () => {
    if (this.props.user) {
      this.setState({ commentBoxExpanded: !this.state.commentBoxExpanded });
    } else {
      this.props.openModal('login');
    }
  };

  render() {
    let classString = 'comment';
    if (this.props.comment.hasReplies || this.state.commentBoxExpanded) {
      classString += ' has-replies';
    }

    if (this.props.comment.child) {
      classString += ' child';
    } else if (this.props.comment.fork) {
      classString += ' fork';
    }

    const replyState = (this.state.commentBoxExpanded) ?
      'button pull-right engaged' : 'button pull-right';
    const replyNestLevel = (this.props.comment.hasReplies) ?
      this.props.comment.nestLevel + 1 : this.props.comment.nestLevel;

    let markup = (<div className={classString}>
      <div className="author">
        <Avatar name={this.props.comment.user.name} hex={this.props.comment.user.color} />
      </div>
      <div className="comment-container">
        <div className="comment-header">
          <TimeAgo timestamp={this.props.comment.created} />
          <div className="author-name">
            {this.props.comment.user.name}
          </div>
        </div>
        <div className="comment-text"
          dangerouslySetInnerHTML={{ __html: this.props.comment.body }}
        ></div>
        {(replyNestLevel <= 4) ? (<div className="comment-options">
          <div className={replyState} onClick={this.toggleReplyBox}>Reply</div>
        </div>) : null}
        {(this.state.commentBoxExpanded && this.props.comment.hasReplies) ?
          <AddCommentBox user={this.props.user} parentComment={this.props.comment}
            postId={this.props.comment.post_id} fork openModal={this.props.openModal}
            onSubmission={this.toggleReplyBox} socketConnected={this.props.socketConnected}
          />
          : null
        }
      </div>
      {(this.state.commentBoxExpanded && !this.props.comment.hasReplies) ?
        <AddCommentBox user={this.props.user} parentComment={this.props.comment}
          postId={this.props.comment.post_id} openModal={this.props.openModal}
          onSubmission={this.toggleReplyBox} socketConnected={this.props.socketConnected}
        />
        : null
      }
    </div>);

    for (let i = this.props.comment.nestLevel; i > 0; i--) {
      markup = (<div className="reply-container"><div className="reply">{markup}</div></div>);
    }
    return markup;
  }
}
