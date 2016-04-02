import connect from '../connection';
import onError from '../util/on-error';

export default onError(async function getPostByUrlString(urlString, db = connect()) {
  return (await db.one(
    'select * from t_post where urlstring=$1',
    urlString
  )).map(post => {
    const newPost = post;
    newPost.id = Number(newPost.id);
    newPost.created = Number(newPost.created);
    return newPost;
  });
});
