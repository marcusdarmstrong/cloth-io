import React from 'react';

const Modal = (props) => (
  <div className="modal-screen">
    <div className="modal-container">
      {props.children}
    </div>
  </div>
);

Modal.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element),
};

export default Modal;
