import React from 'react';
import Modal from './modal';

class Nav extends React.Component {
  render() {
    const {modal, openModal} = this.props;
    return (
      <div className="nav-container">
        <nav>
          <div className="button pull-right" onClick={openModal.bind(this, 'login')}>Log in</div>
          <a href="/"><img className="logo" src="/public/images/logo.png" /></a>
        </nav>
        {(modal) ? React.createElement(Modal, this.props, React.createElement(modal)) : null}
      </div>
    );
  }
}

Nav.propTypes = {
  modal: React.PropTypes.instanceOf(React.ReactClass),
  openModal: React.PropTypes.func.isRequired,
};

export default Nav;
