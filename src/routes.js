import Home from './components/home';
import Post from './components/post';
import Share from './components/share';

export default [
  { name: 'Share', path: '/share', component: Share },
  { name: 'Post', pattern: /\/p\/(.+)/, component: Post },
  { name: 'Home', path: '/', component: Home },
];
