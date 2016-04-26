import db from '../connection';
import getUserById from '../loaders/get-user-by-id';

export default async function minimizeComment(userId, commentId) {
  if (userId && commentId) {
    const user = await getUserById(userId);
    if (user) {
      const insertResult = await db.one(
        `insert into t_comment_minimization (user_id, comment_id)
          values ($(userId), $(commentId))
        on conflict (user_id, comment_id) do
          update set status = 0
        returning id`,
        { userId, commentId }
      );
      if (insertResult) {
        return { success: true };
      }
    }
  }
  return { success: false };
};
