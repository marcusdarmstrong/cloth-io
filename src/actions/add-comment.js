// @flow
import type { State } from '../entities/state';
import type { Comment } from '../entities/comment';
import { fromJS } from 'immutable';
import commentOrdering from '../comment-ordering';

export const TYPE = 'ADD_COMMENT';

export type Action = {
  type: string,
  comment: Comment,
};

export function reduce(state: State, action: Action) {
  if (action.type !== TYPE) {
    return state;
  }
  if (action.comment.clientId) {
    return state
      .update('socket', socket =>
        socket.update('received', received => received.push(action.comment.clientId))
      )
      .update('comments', comments => fromJS(commentOrdering(
        comments.push(action.comment).toJS()
      ))
    );
  }
  return state.update('comments', comments => fromJS(commentOrdering(
    comments.push(action.comment).toJS()
  )));
}
