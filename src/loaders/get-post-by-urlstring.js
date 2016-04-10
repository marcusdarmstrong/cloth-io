import db from '../connection';
import onError from '../util/on-error';

export default onError(async function getPostByUrlString(urlString) {
  const post = await db.one(
    `select p.*, u.name, u.color
      from t_post p join t_user u on u.id = p.user_id
      where urlstring=$1`,
    urlString
  );
  post.id = Number(post.id);
  post.created = Number(post.created);
  post.user = {
    name: post.name,
    color: post.color,
  };
  delete post.name;
  delete post.color;
  return post;
});
