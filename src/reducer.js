import { OPEN_MODAL, CLOSE_MODAL } from './actions';
import Immutable from 'immutable';
import LoginForm from './components/login-form';

export default (state = Immutable.List, action) => {
  switch (action.type) {
  case OPEN_MODAL:
    return state.set('modal', LoginForm);
  case CLOSE_MODAL:
    return state.set('modal', null);
  default:
    return state;
  }
};
