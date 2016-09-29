// @flow

import type { User } from './user';

export type Post = {
  id: number,
  body: string,
  commentCount: number,
  created: number,
  user: User,
};
