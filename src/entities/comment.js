// @flow

export type Comment = {
  id: number,
  userId: number,
  postId: number,
  created: number,
  body: string,
  clientId?: string,
};
