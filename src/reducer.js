import {
  ADD_COMMENT, OPEN_MODAL, CLOSE_MODAL,
  LOGIN_USER, SOCKET_CONNECT, MINIMIZE_COMMENT,
  MAXIMIZE_COMMENT,
} from './actions';
import { Map as map, fromJS } from 'immutable';
import LoginForm from './components/login-form';
import SignupForm from './components/signup-form';
import commentOrdering from './comment-ordering';

export default (state = map(), action) => {
  switch (action.type) {
    case ADD_COMMENT:
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
    case OPEN_MODAL:
      if (action.modalType === 'login') {
        return state.set('modal', map({ component: LoginForm, title: 'Log in' }));
      }
      return state.set('modal', map({ component: SignupForm, title: 'Create account' }));
    case CLOSE_MODAL:
      return state.set('modal', null);
    case LOGIN_USER:
      return state.set('user', action.user);
    case SOCKET_CONNECT:
      return state.update('socket', socket => socket.set('connected', true));
    case MINIMIZE_COMMENT:
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
    case MAXIMIZE_COMMENT:
      return state.update('comments',
        comments => fromJS(
          commentOrdering(
            comments.update(
              comments.findIndex(
                comment => comment.get('id') === action.commentId
              ),
              comment => comment.set('minimized', false)
            ).toJS()
          )
        )
      );
    default:
      return state;
  }
};
