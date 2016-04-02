import readAuthTokenFromCookies from '../auth-token';
import { validate, URL_REX, TITLE_REX } from '../validator';
import connect from '../connection';
import getUserById from '../loaders/get-user-by-id';
import onErrorTry from '../util/on-error-try';
import sanitizeHtml from 'sanitize-html';

export default onErrorTry(async (req, res) => {
  const userId = readAuthTokenFromCookies(req);
  const body = sanitizeHtml(req.body.body, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'div', 'h2', 'h3'],
    allowedAttributes: {
      a: ['href'],
    },
  });

  const link = (validate(URL_REX, req.body.link)) ? req.body.link : null;
  const title = (validate(TITLE_REX, req.body.title)) ? req.body.title.trim() : null;
  const urlStringRoot = title.toLowerCase().replace(/ /g, '-').replace(/[^a-z-1234567890]/g, '');

  if (userId && body && body !== '') {
    const db = connect();
    const urlStringLike = `${urlStringRoot}%`;

    const countResult = await db.one(
      'select count(*) as count from t_post where urlstring like $(urlStringLike)',
      { urlStringLike }
    );
    const urlString = (Number(countResult.count) === 0) ?
      urlStringRoot : `${urlStringRoot}-${countResult.count}`;
    const user = await getUserById(userId);
    if (user && user.status > 0) {
      const insertResult = await db.one(
        `insert into t_post (user_id, title, urlstring, body, url)
          values ($(userId), $(title), $(urlString), $(body), $(link))
          returning id`,
        { userId, title, urlString, body, link }
      );
      if (insertResult) {
        res.json({ success: true, post: { urlstring: urlString } });
      } else {
        res.json({ success: false, message: 'insert failed' });
      }
    } else {
      res.json({ success: false, message: 'No permissions' });
    }
  } else {
    res.json({ success: false, message: 'Didn\'t validate' });
  }
}, (req, res) => res.status(500).json({ success: false, message: 'Internal Error' }));
