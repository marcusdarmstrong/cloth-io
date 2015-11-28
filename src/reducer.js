import { OPEN_MODAL, CLOSE_MODAL } from './actions';
import Immutable from 'immutable';
import LoginForm from './components/login-form';
import SignupForm from './components/signup-form';

export default (state = Immutable.List, action) => {
  switch (action.type) {
  case OPEN_MODAL:
    if (action.modalType === 'login') {
      return state.set('modal', LoginForm);
    }
    return state.set('modal', SignupForm);
  case CLOSE_MODAL:
    return state.set('modal', null);
  default:
    return state;
  }
};
