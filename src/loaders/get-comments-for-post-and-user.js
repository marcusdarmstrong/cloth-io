import connect from '../connection';
import onError from '../util/on-error';

const commentQuery = () =>
  `select
    c.*,
    u.name,
    u.color,
    m.id as minimized
    from t_comment c
    join t_user u
      on u.id = c.user_id
    left join t_comment_minimization m
      on m.user_id=$(userId)
        and m.comment_id = c.id
        and m.status = 0
    where
      c.post_id=$(postId)`;

export default onError(async function getCommentsForPostAndUser(postId, userId, db = connect()) {
  return await db.any(commentQuery(), { postId, userId });
}, []);
