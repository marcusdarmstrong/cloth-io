import cs from '../util/classes';
import React from 'react';

const Button = ({ children, onClick, classNames, href, engaged }) => {
  if (href) {
    return <a className={cs('button', classNames)} href={href}>{children}</a>;
  }
  if (onClick) {
    return <div className={cs('button', classNames)} onClick={onClick}>{children}</div>;
  }
  if (engaged) {
    return <div className={cs('button', 'engaged', classNames)}>{children}</div>;
  }
  return <div className={cs('button', 'disabled', classNames)}>{children}</div>;
};

Button.propTypes = {
  children: React.PropTypes.string.isRequired,
  href: React.PropTypes.string,
  onClick: React.PropTypes.func,
  classNames: React.PropTypes.arrayOf(React.PropTypes.string),
  engaged: React.PropTypes.bool,
};

export default Button;
