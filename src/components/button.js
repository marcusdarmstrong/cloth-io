import cs from '../util/classes';
import React from 'react';

const Button = ({ children, onClick, classNames, href, engaged }) => {
  if (href) {
    const className = (engaged) ? 'button engaged' : 'button';
    return <a className={cs(className, classNames)} href={href}>{children}</a>;
  }
  if (onClick) {
    const className = (engaged) ? 'button engaged' : 'button';
    return <div className={cs(className, classNames)} onClick={onClick}>{children}</div>;
  }
  if (engaged) {
    return <div className={cs('button', 'engaged', classNames)} onClick={onClick}>{children}</div>;
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
