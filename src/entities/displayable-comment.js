// @flow

import type { User } from '../entities/user';

export type DisplayableComment = {
  id: number,
  user: User,
  postId: number,
  created: number,
  body: string,
  clientId?: string,
  fork: boolean,
  hasReplies: boolean,
  isReply: boolean,
  nestLevel: number,
};
