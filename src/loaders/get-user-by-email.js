import connect from '../connection';
import sql from '../util/sql';
import onError from '../util/onError';

export default onError(async function getUserByEmail(email, db = connect()) {
  return await db.one(
    sql`select u.id, u.status, u.name, u.color, u.passhash from t_user u where u.email=${email}`
  );
});
