import Home from './handlers/home';
import Post from './handlers/post';
import Share from './handlers/share';

export default {
  '/': Home,
  '/p/:urlString': Post,
  '/share': Share,
};
