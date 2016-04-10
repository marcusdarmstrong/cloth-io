import { List as list } from 'immutable';
import commentOrdering from '../comment-ordering';
import getPostByUrlString from '../loaders/get-post-by-urlstring';
import getUserById from '../loaders/get-user-by-id';
import getCommentsForPostAndUser from '../loaders/get-comments-for-post-and-user';

export default async (userId, urlString) => {
  const post = await getPostByUrlString(urlString);
  const comments = await getCommentsForPostAndUser(post.id, userId);
  const user = await getUserById(userId);

  return {
    title: post.title,
    post,
    comments: list(commentOrdering(comments)),
    user,
    modal: null,
    socket: `/comments-${post.id}`,
    socketConnected: false,
    received: list(),
    route: 'Post',
  };
};
