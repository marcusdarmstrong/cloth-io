// @flow

import db from '../connection';
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

export default onError(async function getCommentsForPostAndUser(postId, userId) {
  return (await db.any(commentQuery(), { postId, userId })).map(comment => {
    const newComment = comment;
    newComment.id = Number(newComment.id);
    newComment.postId = Number(newComment.post_id);
    delete newComment.post_id;
    newComment.created = Number(newComment.created);
    newComment.minimized = !!newComment.minimized;
    newComment.user = {
      name: comment.name,
      color: comment.color,
    };
    delete newComment.name;
    delete newComment.color;
    return newComment;
  });
}, []);
