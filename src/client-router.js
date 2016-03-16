export default (routes, path) => {
  for (let i = 0; routes.length; i++) {
    const route = routes[i];
    if (route.pattern && route.pattern.test(path)) {
      return route.component;
    } else if (route.path && route.path === path) {
      return route.component;
    }
  }
  return null;
};
