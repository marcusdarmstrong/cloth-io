import connect from '../connection';
import onError from '../util/on-error';

export default onError(async function getPostByUrlString(urlString, db = connect()) {
  return await db.one(
    'select * from t_post where urlString=$(urlString)',
    { urlString }
  );
});
