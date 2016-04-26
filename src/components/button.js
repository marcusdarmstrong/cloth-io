import cs from '../util/classes';
import React from 'react';

const Button = ({ children, onClick, classNames, href, engaged }) => {
  const className = cs((engaged) ? 'button engaged' : 'button', classNames);
  if (href) {
    return <a className={className} href={href}>{children}</a>;
  }
  if (onClick || engaged) {
    return <div className={className} onClick={onClick}>{children}</div>;
  }
  return <div className={cs('button', 'disabled', classNames)}>{children}</div>;
};

Button.propTypes = {
  children: React.PropTypes.string.isRequired,
  href: React.PropTypes.string,
  onClick: React.PropTypes.func,
  classNames: React.PropTypes.string,
  engaged: React.PropTypes.bool,
};

export default Button;
