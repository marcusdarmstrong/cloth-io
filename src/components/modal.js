import React from 'react';

export default (props) => (
  <div className="modal-screen">
    <div className="modal-container">
      {props.children}
    </div>
  </div>
);
