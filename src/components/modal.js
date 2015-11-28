import React from 'react';

const Modal = (props) => (
  <div className="modal-screen">
    <div className="modal-container">
      <div className="modal-frame">
        <div className="modal-header">
          <span className="close-button pull-right">&times;</span>
          <h2>{props.title}</h2>
        </div>
        <div className="modal-content">
          {props.children}
        </div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default Modal;