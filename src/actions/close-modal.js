// @flow
import type { State } from '../entities/state';

export const TYPE = 'CLOSE_MODAL';

export type Action = {
  type: string,
};

export function reduce(state: State) {
  return state.set('modal', null);
}
