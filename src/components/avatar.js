// @flow

import React from 'react';
import Bubble from './bubble';
import type { User } from '../entities/user';

type Props = {
  user: User,
  className?: string,
  onClick?: () => void,
};

export default ({ user, className, onClick }: Props) =>
  <Bubble
    letter={user.name.charAt(0).toUpperCase()}
    hex={user.color} className={className} onClick={onClick}
  />;
