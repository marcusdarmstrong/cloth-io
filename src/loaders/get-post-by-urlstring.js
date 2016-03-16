import connect from '../connection';
import sql from '../util/sql';
import onError from '../util/on-error';

export default onError(async function getPostByUrlString(urlString, db = connect()) {
  return await db.one(
    sql`select * from t_post where urlString=${urlString}`
  );
});
