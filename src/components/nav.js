import React from 'react';
import Modal from './modal';

class Nav extends React.Component {
  render() {
    let modal = null;
    if (this.props.modal) {
      modal = React.createElement(
        Modal,
        this.props,
        React.createElement(this.props.modal.component, this.props)
      );
    }

    return (
      <div className="nav-container">
        <nav>
          <div className="button pull-right" onClick={this.props.openModal.bind(this, 'login')}>Log in</div>
          <a href="/"><img className="logo" src="/public/images/logo.png" /></a>
        </nav>
        {modal}
      </div>
    );
  }
}

Nav.propTypes = {
  modal: React.PropTypes.shape({
    component: React.PropTypes.instanceOf(React.Component),
  }),
  openModal: React.PropTypes.func.isRequired,
};

export default Nav;
