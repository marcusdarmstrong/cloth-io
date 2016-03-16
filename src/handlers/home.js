import { Map as map } from 'immutable';
import getTopPosts from '../loaders/get-top-posts';
import Home from '../components/home';

export default async () => ({
  state: map({
    title: 'New York Jets / cloth.io',
    posts: await getTopPosts(),
  }),
  component: Home,
});
