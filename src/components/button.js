// @flow

import React from 'react';

type Props = {
  children: string,
  onClick?: () => void,
  href?: string,
  className?: string,
  engaged?: boolean,
};

export default ({ children, onClick, className, href, engaged }: Props) => {
  let baseClass = 'button';
  if (engaged) {
    baseClass += ' engaged';
  }
  if (href) {
    return <a className={`${baseClass} ${className}`} href={href}>{children}</a>;
  }
  if (onClick || engaged) {
    return <div className={`${baseClass} ${className}`} onClick={onClick}>{children}</div>;
  }
  baseClass += 'disabled';
  return <div className={`${baseClass} ${className}`}>{children}</div>;
};
