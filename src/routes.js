import Home from './components/home';
import Post from './components/post';

export default [
  { name: 'Post', pattern: /\/p\/(.+)/, component: Post },
  { name: 'Home', path: '/', component: Home },
];
