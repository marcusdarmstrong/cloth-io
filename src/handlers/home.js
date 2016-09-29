// @flow

import { default as getTopPosts, defaultPageSize } from '../loaders/get-top-posts';
import getUserById from '../loaders/get-user-by-id';

export default async (userId: number, page: ?string) => {
  const numPage = Number(page || 0);

  let posts = await getTopPosts(numPage, defaultPageSize + 1, defaultPageSize);
  let nextPage = undefined;
  const prevPage = (numPage > 0) ? numPage - 1 : undefined;

  if (posts.length > defaultPageSize) {
    posts = posts.slice(0, defaultPageSize);
    nextPage = numPage + 1;
  }

  return {
    title: 'New York Jets / cloth.io',
    posts,
    user: await getUserById(userId),
    route: 'Home',
    nextPage,
    prevPage,
  };
};
