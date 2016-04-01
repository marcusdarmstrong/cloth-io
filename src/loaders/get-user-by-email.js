import connect from '../connection';
import onError from '../util/on-error';

export default onError(async function getUserByEmail(email, db = connect()) {
  return await db.one(
    'select u.id, u.status, u.name, u.color, u.passhash from t_user u where u.email=$(email)',
    { email }
  );
});
