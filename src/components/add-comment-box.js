// @flow

import React from 'react';
import ContentEditable from './content-editable';
import CommentFrame from './comment-frame';
import Button from './button';
import CommentHeader from './comment-header';
import fetch from 'isomorphic-fetch';
import guid from '../util/guid';

import type { User } from '../entities/user';

type Props = {
  user?: User,
  parentComment?: {
    id: number,
  },
  fork?: boolean,
  openModal: () => void,
  onSubmission?: () => void,
  postId: number,
  socketConnected: boolean,
  received: string[],
};

type State = {
  value: string,
  sending: boolean | string,
};

export default class AddCommentBox extends React.Component {
  state: State = {
    value: '',
    sending: false,
  };

  componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.received.indexOf(this.state.value) !== -1) {
      if (this.props.onSubmission) {
        this.setState({ value: '', sending: false }, this.props.onSubmission);
      } else {
        this.setState({ value: '', sending: false });
      }
    }
  }

  props: Props;

  handleChange: (event: { target: { value: string } }) => void =
    (event: { target: { value: string } }): void => {
      this.setState({ value: event.target.value });
    };

  addComment: () => void = (): void => {
    const clientId = guid();
    this.setState({ sending: clientId });
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
        clientId,
      }),
    }).then((res: Response): Object => res.json())
      .then((data: Object): void => {
        if (data.success) {
          if (this.props.onSubmission && this.state.sending) {
            this.setState({ value: '', sending: false }, this.props.onSubmission);
          } else if (this.state.sending) {
            this.setState({ value: '', sending: false });
          }
        }
      });
  };

  openLoginModal: () => void = (): void => this.props.openModal('login');

  render(): React.Element {
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
        classNames={'add-comment'}
      >
        <Button onClick={this.openLoginModal}>Log in to comment</Button>
      </CommentFrame>
    );
  }
}
