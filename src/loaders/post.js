import { native as pg } from 'pg';
import { List as list, Map as map } from 'immutable';
import commentOrdering from '../comment-ordering';
import sql from '../sql';

const commentQuery = (post, user) =>
  sql`select
    c.*,
    u.name,
    u.color,
    m.id as minimized
    from t_comment c
    join t_user u
      on u.id = c.user_id
    left join t_comment_minimization m
      on m.user_id=${user.id}
        and m.comment_id = c.id
        and m.status = 0
    where
      c.post_id=${post.id}`;


const buildState = (title, post, comments, user) => {
  return map({title, post, comments, user, modal: null, socket: '/comments-' + post.id, socketConnected: false});
};

export default (cb, urlString) => {
  pg.connect(process.env.DATABASE_URL, (pgErr, client, done) => {
    if (pgErr) {
      console.error(pgErr);
      cb(map());
      return;
    }
    client.query(sql`select * from t_post where urlstring=${urlString}`, (err, result) => {
      done();
      if (err || !result || !result.rows || result.rows.length !== 1) {
        console.error(err);
        cb(map());
      } else {
        const post = result.rows[0];
        client.query(commentQuery(post), (commentErr, commentResult) => {
          const comments = list(commentOrdering(commentResult.rows));
          cb(buildState(post.title, post, comments));
        });
      }
    });
  });
};
