import React from 'react';

const Bubble = ({ letter, hex, className, onClick }) => {
  const color = `#${hex}`;
  const fullClass = (className) ? `bubble ${className}` : 'bubble';

  return (
    <div className={fullClass} style={{ backgroundColor: color }} onClick={onClick}>
        <span className="bubble-letter">{letter}</span>
    </div>
  );
};

Bubble.propTypes = {
  letter: React.PropTypes.string.isRequired,
  hex: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default Bubble;
