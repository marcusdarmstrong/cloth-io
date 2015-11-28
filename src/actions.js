export const ADD_COMMENT = 'ADD_COMMENT';

export function set(postId, authorId, parentId, body) {
  return {
    type: ADD_COMMENT,
    postId,
    authorId,
    parentId,
    body,
  };
}
