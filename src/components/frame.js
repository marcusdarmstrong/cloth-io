import React from 'react';
import Nav from './nav';
import Modal from './modal';

const Frame = ({ modal, children, ...props }) => (
  <div>
    <Nav {...props} />
    <div className="spacer">
      <div className="container">
        {children}
      </div>
    </div>
    {(modal) ? (
      <Modal title={props.modal.title}>
        {React.createElement(props.modal.component, props)}
      </Modal>
      ) : null}
  </div>
);

Frame.propTypes = Object.assign({
  modal: React.PropTypes.shape({
    component: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
  }),
  children: React.PropTypes.node,
}, Nav.propTypes);

export default Frame;
