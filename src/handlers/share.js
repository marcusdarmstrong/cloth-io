import { Map as map } from 'immutable';
import getUserById from '../loaders/get-user-by-id';
import { readAuthTokenFromCookies } from '../auth-token';

export default async (req) => ({
  state: map({
    title: 'Share a Story / New York Jets / cloth.io',
    user: await getUserById(readAuthTokenFromCookies(req)),
    route: 'Share',
  }),
});
