import connect from '../connection';
import onError from '../util/on-error';

export default onError(async function getPostByUrlString(urlString, db = connect()) {
  const post = await db.one(
    'select * from t_post where urlstring=$1',
    urlString
  );
  post.id = Number(post.id);
  post.created = Number(post.created);
  return post;
});
