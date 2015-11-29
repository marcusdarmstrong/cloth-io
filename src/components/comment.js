import React from 'react';
import TimeAgo from './time-ago';
import AddCommentBox from './add-comment-box';

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {commentBoxExpanded: false};
  }
  toggleReplyBox() {
    this.setState({commentBoxExpanded: !!this.state.commentBoxExpanded});
  }
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
    const avatar = this.props.comment.name.charAt(0).toUpperCase();
    const avatarColor = '#' + this.props.comment.color;
    const replyState = (this.state.commentBoxExpanded) ? 'button pull-right engaged' : 'button pull-right';

    let markup = (<div className={classString}>
      <div className="author"><div className="avatar" style={{backgroundColor: avatarColor}}>{avatar}</div></div>
      <div className="comment-container">
        <div className="comment-header">
          <TimeAgo timestamp={this.props.comment.created} />
          <div className="author-name">
            {this.props.comment.name}
          </div>
        </div>
        <div className="comment-text" dangerouslySetInnerHTML={{__html: this.props.comment.body}}></div>
        <div className="comment-options">
          <div className={replyState} onClick={this.toggleReplyBox.bind(this)}>Reply</div>
        </div>
        {(this.state.commentBoxExpanded && this.props.comment.hasReplies) ? <AddCommentBox user={this.props.user} parentComment={this.props.comment} fork /> : null}
      </div>
      {(this.state.commentBoxExpanded && !this.props.comment.hasReplies) ? <AddCommentBox user={this.props.user} parentComment={this.props.comment} /> : null}
    </div>);

    let nestLevel = this.props.comment.nestLevel;
    if (this.props.comment.child) {
      --nestLevel;
    }
    for (let i = nestLevel; i > 0; i--) {
      markup = (<div className="reply">{markup}</div>);
    }
    return markup;
  }
}

Comment.propTypes = {
  comment: React.PropTypes.shape({
    name: React.PropTypes.string,
    color: React.PropTypes.string,
    created: React.PropTypes.number,
    body: React.PropTypes.string,
    nestLevel: React.PropTypes.number,
    hasReplies: React.PropTypes.bool,
    fork: React.PropTypes.bool,
    child: React.PropTypes.bool,
  }).isRequired,
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
    color: React.PropTypes.string,
  }),
};

export default Comment;
