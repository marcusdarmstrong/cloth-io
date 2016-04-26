import React from 'react';

const Bubble = ({ letter, hex, className, onClick }) => (
  <div className={(className) ? `bubble ${className}` : 'bubble'}
    style={{ backgroundColor: `#${hex}` }} onClick={onClick}
  >
      <span className="bubble-letter">{letter}</span>
  </div>
);

Bubble.propTypes = {
  letter: React.PropTypes.string.isRequired,
  hex: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default Bubble;
