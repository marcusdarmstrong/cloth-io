const createHandler = (route, cb, stateMiddleware) => (req, res) => {
  if (route.pattern) {
    const matches = route.pattern.exec(req.url);
    if (matches) {
      matches.shift();
      route.loader(
        state => stateMiddleware(req, state, cb.bind(null, route.component, res)),
        ...matches
      );
    } else {
      res.status(500).send(`Internal error: ${req.url}`);
    }
  } else {
    route.loader(state => stateMiddleware(req, state, cb.bind(null, route.component, res)));
  }
};

export default (app, routes, cb, stateMiddleware) => {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    app.get(route.pattern || route.path, createHandler(route, cb, stateMiddleware));
  }
};
