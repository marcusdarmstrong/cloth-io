// @flow

import onError from './util/on-error';

export default (handler: (req: Request) => Promise<Object>) => onError(async (req, res) => {
  res.json(await handler(req));
}, (req, res) => res.status(500).json({ success: false }));
