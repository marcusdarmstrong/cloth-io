const createHandler = (route, cb, stateMiddleware) => {
  return (req, res) => {
    if (route.pattern) {
      const matches = route.pattern.exec(res.url);
      if (matches) {
        matches.shift();
        route.loader(state => stateMiddleware(req, state, cb.bind(null, res, route.component)), ...matches);
      } else {
        res.status(500).send('Internal error');
      }
    } else {
      route.loader(state => stateMiddleware(req, state, cb.bind(null, res, route.component)));
    }
  };
};

export default (app, routes, cb, stateMiddleware) => {
  for (let i = 0; routes.length; i++) {
    const route = routes[i];
    app.get(route.pattern || route.path, createHandler(route, cb, stateMiddleware));
  }
};
