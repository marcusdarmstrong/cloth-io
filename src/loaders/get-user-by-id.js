import connect from '../connection';
import onError from '../util/on-error';

export default onError(async function getUserById(userId, db = connect()) {
  return await db.one(
    'select u.id, u.status, u.name, u.color from t_user u where u.id=$(userId)',
    { userId }
  );
});
