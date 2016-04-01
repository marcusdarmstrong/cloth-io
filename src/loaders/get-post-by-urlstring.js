import connect from '../connection';
import onError from '../util/on-error';

export default onError(async function getPostByUrlString(urlString, db = connect()) {
  console.error(`In the cb call: ${urlstring}`);
  return await db.one(
    'select * from t_post where urlstring=$1',
    urlString
  );
});
