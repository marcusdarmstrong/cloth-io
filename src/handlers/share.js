import { Map as map } from 'immutable';
import getUserById from '../loaders/get-user-by-id';

export default async (userId) => map({
  title: 'Share a Story / New York Jets / cloth.io',
  user: await getUserById(userId),
  route: 'Share',
});
