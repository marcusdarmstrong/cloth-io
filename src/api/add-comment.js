import connect from '../connection';
import getUserById from '../loaders/get-user-by-id';
import sanitizeHtml from 'sanitize-html';

export default (io) => async (userId, postId, parentId, clientId, text) => {
  const body = sanitizeHtml(text, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'div'],
    allowedAttributes: {
      a: ['href'],
    },
  });

  if (userId && body && body !== '') {
    const db = connect();
    const user = await getUserById(userId, db);
    if (user) {
      const insertResult = await db.one(
        `insert into t_comment (user_id, post_id, parent_id, body)
          values ($(userId), $(postId), $(parentId), $(body))
          returning id, created`,
        { userId, postId, parentId, body }
      );
      if (insertResult) {
        const comment = {
          id: Number(insertResult.id),
          created: Number(insertResult.created),
          user,
          parent_id: Number(parentId),
          post_id: Number(postId),
          body,
        };
        if (clientId) {
          comment.clientId = clientId;
        }
        io.of(`/comments-${postId}`).emit('ADD_COMMENT', comment);
        return { success: true };
      }
    }
  }
  return { success: false };
};
