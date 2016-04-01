import connect from '../connection';
import onError from '../util/on-error';

export default onError(async function getPostByUrlString(urlString, db = connect()) {
  // eslint-disable-next-line
  console.error(`In the cb call: ${JSON.stringify(arguments)}`);
  return await db.one(
    'select * from t_post where urlstring=$1',
    urlString
  );
});
