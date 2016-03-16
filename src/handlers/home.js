import { Map as map } from 'immutable';
import getTopPosts from '../loaders/get-top-posts';
import Home from '../components/home';
import connect from '../connection';

export default async () => ({
  state: map({
    title: 'New York Jets / cloth.io',
    posts: await getTopPosts(connect()),
  }),
  component: Home,
});
