import connect from '../connection';
import getUserById from '../loaders/get-user-by-id';

export default async function maximizeComment(userId, commentId) {
  if (userId && commentId) {
    const db = connect();
    const user = await getUserById(userId, db);
    if (user) {
      const insertResult = await db.one(
        `insert into t_comment_minimization (user_id, comment_id)
          values ($(userId), $(commentId))
        on conflict (user_id, comment_id) do
          update status = 1`
        ,
        { userId, commentId }
      );
      if (insertResult) {
        return { success: true };
      }
    }
  }
  return { success: false };
};
