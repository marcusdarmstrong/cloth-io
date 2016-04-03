import { validate, URL_REX, TITLE_REX } from '../validator';
import connect from '../connection';
import getUserById from '../loaders/get-user-by-id';
import sanitizeHtml from 'sanitize-html';

export default async (userId, rawLink, rawTitle, rawBody) => {
  const body = sanitizeHtml(rawBody, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'div', 'h2', 'h3'],
    allowedAttributes: {
      a: ['href'],
    },
  });

  const link = (validate(URL_REX, rawLink)) ? rawLink : null;
  const title = (validate(TITLE_REX, rawTitle)) ? rawTitle.trim() : null;
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
        return { success: true, post: { urlstring: urlString } };
      }
      return { success: false, message: 'Insert failed' };
    }
    return { success: false, message: 'No permissions' };
  }
  return { success: false, message: 'Didn\'t validate' };
};
