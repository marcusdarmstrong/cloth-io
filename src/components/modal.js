import React from 'react';

const Modal = (props) => (
  <div className="modal-screen">
    <div className="modal-container">
      {props.children}
    </div>
  </div>
);

Modal.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default Modal;
