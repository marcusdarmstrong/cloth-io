// @flow

import type { State } from './entities/state';
import { Map as map } from 'immutable';

import * as AddComment from './actions/add-comment';
import * as OpenModal from './actions/open-modal';
import * as CloseModal from './actions/close-modal';
import * as LoginUser from './actions/login-user';
import * as MinimizeComment from './actions/minimize-comment';
import * as MaximizeComment from './actions/maximize-comment';
import * as SocketConnect from './actions/socket-connect';

type Action = AddComment.Action | OpenModal.Action | CloseModal.Action | LoginUser.Action
  | MinimizeComment.Action | MaximizeComment.Action | SocketConnect.Action;

export default (state : State = map(), action: Action) => {
  switch (action.type) {
    case AddComment.TYPE:
      return AddComment.reduce(state, ((action: any): AddComment.Action));
    case OpenModal.TYPE:
      return OpenModal.reduce(state, ((action: any): OpenModal.Action));
    case CloseModal.TYPE:
      return CloseModal.reduce(state, ((action: any): CloseModal.Action));
    case LoginUser.TYPE:
      return LoginUser.reduce(state, ((action: any): LoginUser.Action));
    case SocketConnect.TYPE:
      return SocketConnect.reduce(state, ((action: any): SocketConnect.Action));
    case MinimizeComment.TYPE:
      return MinimizeComment.reduce(state, ((action: any): MinimizeComment.Action));
    case MaximizeComment.TYPE:
      return MaximizeComment.reduce(state, ((action: any): MaximizeComment.Action));
    default:
      return state;
  }
};
