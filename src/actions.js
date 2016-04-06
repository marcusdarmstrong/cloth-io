export const ADD_COMMENT = 'ADD_COMMENT';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const LOGIN_USER = 'LOGIN_USER';
export const SOCKET_CONNECT = 'SOCKET_CONNECT';
export const MINIMIZE_COMMENT = 'MINIMIZE_COMMENT';
export const MAXIMIZE_COMMENT = 'MAXIMIZE_COMMENT';

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function openModal(modalType) {
  return {
    type: OPEN_MODAL,
    modalType,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    user,
  };
}

export function minimizeComment(commentId) {
  return {
    type: MINIMIZE_COMMENT,
    commentId,
  };
}

export function maximizeComment(commentId) {
  return {
    type: MAXIMIZE_COMMENT,
    commentId,
  };
}
