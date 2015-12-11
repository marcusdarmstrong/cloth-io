import homeLoader from './loaders/home';
import postLoader from './loaders/post';
import shareLoader from './loaders/share';
import { Map as map } from 'immutable';

export default (routes) => {
  return routes.map(route => {
    switch (route.name) {
    case 'Post':
      route.loader = postLoader;
      break;
    case 'Home':
      route.loader = homeLoader;
      break;
    case 'Share':
      route.loader = shareLoader;
      break;
    default:
      route.loader = (cb) => cb(map({title: 'cloth.io'}));
    }
    return route;
  });
};
