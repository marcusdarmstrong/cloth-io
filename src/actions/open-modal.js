// @flow
import type { State } from '../entities/state';
import { Map as map } from 'immutable';
import LoginForm from '../components/login-form';
import SignupForm from '../components/signup-form';

export const TYPE = 'OPEN_MODAL';

export type Action = {
  type: string,
  modalType: string,
};

export function reduce(state: State, action: Action) {
  if (action.modalType === 'login') {
    return state.set('modal', map({ component: LoginForm, title: 'Log in' }));
  }
  return state.set('modal', map({ component: SignupForm, title: 'Create account' }));
}
