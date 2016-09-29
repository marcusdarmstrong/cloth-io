// @flow

import React from 'react';
import TimeAgo from './time-ago';

type Props = {
  name: string,
  timestamp?: number,
};

export default ({ name, timestamp }: Props) => (
  <div className="comment-header">
    {(timestamp) ? <TimeAgo timestamp={timestamp} /> : null}
    <div className="author-name">
      {name}
    </div>
  </div>
);
