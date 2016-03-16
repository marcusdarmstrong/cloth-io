export const ADD_COMMENT = 'ADD_COMMENT';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const LOGIN_USER = 'LOGIN_USER';
export const SOCKET_CONNECT = 'SOCKET_CONNECT';

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
