import React from 'react';
import Bubble from './bubble';

const Avatar = ({ user, className, onClick }) =>
  <Bubble letter={user.name.charAt(0).toUpperCase()}
    hex={user.color} className={className} onClick={onClick}
  />;

Avatar.propTypes = {
  user: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    color: React.PropTypes.string.isRequired,
  }).isRequired,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default Avatar;
