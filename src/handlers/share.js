import getUserById from '../loaders/get-user-by-id';

export default async (userId) => ({
  title: 'Share a Story / New York Jets / cloth.io',
  user: await getUserById(userId),
  route: 'Share',
});
