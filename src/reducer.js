import { OPEN_MODAL, CLOSE_MODAL } from './actions';
import { List as list, Map as map } from 'immutable';
import LoginForm from './components/login-form';
import SignupForm from './components/signup-form';

export default (state = list, action) => {
  switch (action.type) {
  case OPEN_MODAL:
    if (action.modalType === 'login') {
      return state.set('modal', map({component: LoginForm, title: 'Log in'}));
    }
    return state.set('modal', map({component: SignupForm, title: 'Create account'}));
  case CLOSE_MODAL:
    return state.set('modal', null);
  default:
    return state;
  }
};
