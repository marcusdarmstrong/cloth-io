import readAuthTokenFromCookies from '../auth-token';
import connect from '../connection';
import sql from '../util/sql';
import getUserById from '../loaders/get-user-by-id';
import onErrorTry from '../util/on-error-try';
import sanitizeHtml from 'sanitize-html';

export default (io) => onErrorTry(async (req, res) => {
  const userId = readAuthTokenFromCookies(req);
  const body = sanitizeHtml(req.body.comment, {
    allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'div' ],
    allowedAttributes: {
      'a': [ 'href' ],
    },
  });
  const parentId = req.body.parentId;
  const postId = req.body.postId;

  if (userId && body && body !== '') {
    const db = connect();
    const user = await getUserById(userId, db);
    if (user) {
      const insertResult = await db.one(sql`insert into t_comment (user_id, post_id, parent_id, body) values (${userId}, ${postId}, ${parentId}, ${body}) returning id, created`);
      if (insertResult) {
        const comment = {
          'id': insertResult.id,
          'created': insertResult.created,
          'user': user,
          'parentId': parentId,
          'postId': postId,
          'comment': body,
        };
        io.of('/comments-' + postId).emit('ADD_COMMENT', comment);
        res.json({success: true, 'comment': comment});
      } else {
        res.json({success: false});
      }
    } else {
      res.json({success: false});
    }
  } else {
    res.json({success: false});
  }
}, (req, res) => res.status(500).json({success: false}));
