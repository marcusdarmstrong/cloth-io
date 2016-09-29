// @flow
import type { State } from '../entities/state';
import { fromJS } from 'immutable';
import commentOrdering from '../comment-ordering';

export const TYPE = 'MINIMIZE_COMMENT';

export type Action = {
  type: string,
  commentId: number,
};

export function reduce(state: State, action: Action) {
  return state.update('comments',
    comments => fromJS(
      commentOrdering(
        comments.update(
          comments.findIndex(
            comment => comment.get('id') === action.commentId
          ),
          comment => comment.set('minimized', true)
        ).toJS()
      )
    )
  );
}
