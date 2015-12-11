import { native as pg } from 'pg';
import { List as list, Map as map } from 'immutable';
import commentOrdering from '../comment-ordering';
import sql from '../sql';

const buildState = (title, post, comments, user) => {
  return map({title, post, comments, user, modal: null, socket: '/comments-' + post.id});
};

export default (cb, urlString) => {
  pg.connect(process.env.DATABASE_URL, (pgErr, client, done) => {
    if (pgErr) {
      return; // This is a res.status(500).send('Internal Server Error');
    }
    client.query(sql`select * from t_post where urlstring=${urlString}`, (err, result) => {
      done();
      if (err || !result || !result.rows || result.rows.length !== 1) {
        // This is a res.status(404).send('Not found');
      } else {
        const post = result.rows[0];
        client.query(sql`select c.*, u.name, u.color from t_comment c join t_user u on u.id = c.user_id where c.post_id=${post.id}`, (commentErr, commentResult) => {
          const comments = list(commentOrdering(commentResult.rows));
          cb(buildState(post.title, post, comments));
        });
      }
    });
  });
};
