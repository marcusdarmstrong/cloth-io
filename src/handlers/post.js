import { List as list, Map as map } from 'immutable';
import commentOrdering from '../comment-ordering';
import Post from '../components/post';
import connect from '../connection';
import getPostByUrlString from '../loaders/get-post-by-urlstring';
import getUserById from '../loaders/get-user-by-id';
import getCommentsForPostAndUser from '../loaders/get-comments-for-post-and-user';
import { readAuthTokenFromCookies } from '../auth-token';

export default async (req) => {
  const userId = readAuthTokenFromCookies(req);

  const db = connect();

  const post = await getPostByUrlString(req.params.urlString, db);
  const comments = await getCommentsForPostAndUser(post.id, userId, db);
  const user = await getUserById(userId, db);

  return {
    state: map({
      title: post.title,
      post,
      comments: list(commentOrdering(comments)),
      user,
      modal: null,
      socket: `/comments-${post.id}`,
      socketConnected: false,
    }),
    component: Post,
  };
};
