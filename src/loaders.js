import homeLoader from './loaders/home';
import postLoader from './loaders/post';

export default (routes) => {
  console.log('Loaders: ' + JSON.stringify(routes));
  return routes.map(route => {
    switch (route.name) {
    case 'Post':
      route.loader = postLoader;
      break;
    case 'Home':
      route.loader = homeLoader;
      break;
    default:
    }
    return route;
  });
};
