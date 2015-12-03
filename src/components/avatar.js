import React from 'react';

export default ({name, hex}) => {
  const avatar = name.charAt(0).toUpperCase();
  const color = '#' + hex;
  return (
    <div className="avatar" style={{backgroundColor: color}}>{avatar}</div>
  );
};
