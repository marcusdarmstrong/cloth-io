import connect from '../connection';
import sql from '../util/sql';
import onError from '../util/on-error';

export default onError(async function getUserById(userId, db = connect()) {
  return await db.one(
    sql`select u.id, u.status, u.name, u.color from t_user u where u.id=${userId}`
  );
});
