import connect from '../connection';
import onError from '../util/on-error';

export default onError(async function getTopPosts(db = connect()) {
  return (await db.query(
    `select
      p.*,
      u.name,
      u.color,
      cc.commentCount
    from
      t_post p
    join t_user u
      on u.id = p.user_id
    left join (
      select
        c.post_id,
        count(*) as commentCount
      from t_comment c
      group by post_id
    ) as cc
      on cc.post_id = p.id
    order by created desc
    limit 10`
  )).map((post) => {
    const newPost = post;
    newPost.created = Number(newPost.created);
    return newPost;
  });
}, []);
