// @flow
import type { State } from '../entities/state';
import type { User } from '../entities/user';

export const TYPE = 'LOGIN_USER';

export type Action = {
  type: string,
  user: User,
};

export function reduce(state: State, action: Action) {
  return state.set('user', action.user);
}
