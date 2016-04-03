import connect from '../connection';
import onError from '../util/on-error';

export default onError(async function getUserByName(name, db = connect()) {
  return await db.one(
    'select u.id, u.status, u.name, u.color from t_user u where lower(u.name)=lower($(name))',
    { name }
  );
});
