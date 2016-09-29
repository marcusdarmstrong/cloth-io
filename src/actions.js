// @flow

import * as AddComment from './actions/add-comment';
import * as OpenModal from './actions/open-modal';
import * as CloseModal from './actions/close-modal';
import * as LoginUser from './actions/login-user';
import * as MinimizeComment from './actions/minimize-comment';
import * as MaximizeComment from './actions/maximize-comment';
import * as SocketConnect from './actions/socket-connect';

import type { User } from './entities/user';
import type { Comment } from './entities/comment';

export function addComment(comment: Comment): AddComment.Action {
  return {
    type: AddComment.TYPE,
    comment,
  };
}

export function openModal(modalType: string): OpenModal.Action {
  return {
    type: OpenModal.TYPE,
    modalType,
  };
}

export function closeModal(): CloseModal.Action {
  return {
    type: CloseModal.TYPE,
  };
}

export function loginUser(user: User): LoginUser.Action {
  return {
    type: LoginUser.TYPE,
    user,
  };
}

export function minimizeComment(commentId: number): MinimizeComment.Action {
  return {
    type: MinimizeComment.TYPE,
    commentId,
  };
}

export function maximizeComment(commentId: number): MaximizeComment.Action {
  return {
    type: MaximizeComment.TYPE,
    commentId,
  };
}

export function socketConnect(): SocketConnect.Action {
  return {
    type: SocketConnect.TYPE,
  };
}
