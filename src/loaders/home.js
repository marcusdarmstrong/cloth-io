import { native as pg } from 'pg';
import sql from './sql';

export default (cb) => {
  pg.connect(process.env.DATABASE_URL, (pgErr, client, done) => {
    client.query(sql`select * from t_post order by created desc limit 10`, (err, result) => {
      done();
      if (!err && result && result.rows) {
        cb({ title: 'New York Jets / cloth.io' });
      } else {
        cb({ title: 'New York Jets / cloth.io - error' });
      }
    });
  });
};
