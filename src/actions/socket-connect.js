// @flow
import type { State } from '../entities/state';

export const TYPE = 'SOCKET_CONNECT';

export type Action = {
  type: string,
};

export function reduce(state: State) {
  return state.update('socket', socket => socket.set('connected', true));
}
