import { native as pg } from 'pg';
import sql from '../sql';
import { Map as map } from 'immutable';

export default (cb) => {
  pg.connect(process.env.DATABASE_URL, (pgErr, client, done) => {
    client.query(sql`select * from t_post order by created desc limit 10`, (err, result) => {
      done();
      if (!err && result && result.rows) {
        cb(map({ title: 'New York Jets / cloth.io', posts: result.rows }));
      } else {
        cb(map({ title: 'New York Jets / cloth.io - error' }));
      }
    });
  });
};
