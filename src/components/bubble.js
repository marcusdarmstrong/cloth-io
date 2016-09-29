// @flow

import React from 'react';

type Props = {
  letter: string,
  hex: string,
  className?: string,
  onClick?: () => void,
};

export default ({ letter, hex, className, onClick }: Props) => (
  <div
    className={(className) ? `bubble ${className}` : 'bubble'}
    style={{ backgroundColor: `#${hex}` }} onClick={onClick}
  >
    <span className="bubble-letter">{letter}</span>
  </div>
);
