// @flow

import React from 'react';

type Props = {
  nestLevel: number,
  children: React.Element | React.Element[] | string,
};

export default ({ nestLevel, children }: Props) => {
  let markup = children;
  for (let i = nestLevel; i > 0; i--) {
    markup = <div className="reply-container"><div className="reply">{markup}</div></div>;
  }
  return markup;
};
