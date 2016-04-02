import { Map as map } from 'immutable';
import getTopPosts from '../loaders/get-top-posts';
import getUserById from '../loaders/get-user-by-id';
import { readAuthTokenFromCookies } from '../auth-token';
import Home from '../components/home';
import connect from '../connect';

export default async (req) => {
  const db = connect();

  return {
    state: map({
      title: 'New York Jets / cloth.io',
      posts: await getTopPosts(db),
      user: await getUserById(readAuthTokenFromCookies(req), db),
    }),
    component: Home,
  };
};
