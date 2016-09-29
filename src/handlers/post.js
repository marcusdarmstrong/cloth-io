// @flow

import { List as list, Map as map } from 'immutable';
import commentOrdering from '../comment-ordering';
import getPostByUrlString from '../loaders/get-post-by-urlstring';
import getUserById from '../loaders/get-user-by-id';
import getCommentsForPostAndUser from '../loaders/get-comments-for-post-and-user';
import NotFound from '../util/not-found';

export default async (userId: number, urlString: string) => {
  const post = await getPostByUrlString(urlString);
  if (!post) {
    throw new NotFound();
  }
  const comments = await getCommentsForPostAndUser(post.id, userId);
  const user = await getUserById(userId);

  return {
    title: post.title,
    post,
    comments: list(commentOrdering(comments)),
    user,
    modal: null,
    socket: map({
      name: `/comments-${post.id}`,
      connected: false,
      received: list(),
    }),
    route: 'Post',
  };
};
