import React from 'react';

const Avatar = ({ name, hex }) => {
  const avatar = name.charAt(0).toUpperCase();
  const color = `#${hex}`;
  return (
    <div className="avatar" style={{ backgroundColor: color }}>
        <span className="avatar-letter">{avatar}</span>
    </div>
  );
};

Avatar.propTypes = {
  name: React.PropTypes.string.isRequired,
  hex: React.PropTypes.string.isRequired,
};

export default Avatar;
