import { ADD_COMMENT, OPEN_MODAL, CLOSE_MODAL, LOGIN_USER, SOCKET_CONNECT } from './actions';
import { Map as map, fromJS } from 'immutable';
import LoginForm from './components/login-form';
import SignupForm from './components/signup-form';
import commentOrdering from './comment-ordering';

export default (state = map, action) => {
  switch (action.type) {
    // eslint-disable-next-line
    case ADD_COMMENT:
      const comments = state.get('comments').toJS();
      comments.push(action.comment);
      return state.set('comments', fromJS(commentOrdering(comments)));
    case OPEN_MODAL:
      if (action.modalType === 'login') {
        return state.set('modal', map({ component: LoginForm, title: 'Log in' }));
      }
      return state.set('modal', map({ component: SignupForm, title: 'Create account' }));
    case CLOSE_MODAL:
      return state.set('modal', null);
    case LOGIN_USER:
      return state.set('user', action.user);
    case SOCKET_CONNECT:
      return state.set('socketConnected', true);
    default:
      return state;
  }
};
