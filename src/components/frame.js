import React from 'react';
import Nav from './nav';
import Modal from './modal';

const Frame = (props) => {
  let modal = null;
  if (props.modal) {
    modal = React.createElement(
      Modal,
      props,
      React.createElement(props.modal.component, props)
    );
  }

  return (
    <div>
      <Nav user={props.user} noShareForm={props.noShareForm}
        openModal={props.openModal} loginUser={props.loginUser}
      />
      <div className="spacer">
        <div className="container">
          {props.children}
        </div>
      </div>
      {modal}
    </div>
  );
};

Frame.propTypes = Object.assign({
  modal: React.PropTypes.shape({
    component: React.PropTypes.func.isRequired,
  }),
  children: React.PropTypes.node,
}, Nav.propTypes);

export default Frame;
