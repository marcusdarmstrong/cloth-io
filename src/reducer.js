import { OPEN_MODAL, CLOSE_MODAL, LOGIN_USER } from './actions';
import { Map as map } from 'immutable';
import LoginForm from './components/login-form';
import SignupForm from './components/signup-form';

export default (state = map, action) => {
  switch (action.type) {
  case OPEN_MODAL:
    if (action.modalType === 'login') {
      return state.set('modal', map({component: LoginForm, title: 'Log in'}));
    }
    return state.set('modal', map({component: SignupForm, title: 'Create account'}));
  case CLOSE_MODAL:
    return state.set('modal', null);
  case LOGIN_USER:
    return state.set('user', action.user);
  default:
    return state;
  }
};
