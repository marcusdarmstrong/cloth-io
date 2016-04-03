import getTopPosts from '../loaders/get-top-posts';
import getUserById from '../loaders/get-user-by-id';
import connect from '../connection';

export default async (userId, page = 0) => {
  const db = connect();

  return {
    title: 'New York Jets / cloth.io',
    posts: await getTopPosts(page, db),
    user: await getUserById(userId, db),
    route: 'Home',
  };
};
