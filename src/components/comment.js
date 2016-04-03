import React from 'react';
import TimeAgo from './time-ago';
import AddCommentBox from './add-comment-box';
import Avatar from './avatar';
import guid from '../util/guid';

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
    let classString = 'comment';
    if (this.props.comment.hasReplies || this.state.commentBox) {
      classString += ' has-replies';
    }

    if (this.props.comment.child) {
      classString += ' child';
    } else if (this.props.comment.fork) {
      classString += ' fork';
    }

    const replyState = (this.state.commentBox) ?
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
      </div>
      {(this.state.commentBox) ?
        <AddCommentBox user={this.props.user} parentComment={this.props.comment}
          postId={this.props.comment.post_id} openModal={this.props.openModal}
          onSubmission={this.toggleReplyBox} socketConnected={this.props.socketConnected}
          key={this.state.commentBox} fork={this.props.comment.hasReplies}
          clientId={this.state.commentBox}
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
