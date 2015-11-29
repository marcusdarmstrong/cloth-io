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

    let userNav = (<div className="button pull-right" onClick={this.props.openModal.bind(this, 'login')}>Log in</div>);
    if (this.props.user) {
      const color = '#' + this.props.user.color;
      const letter = this.props.user.name.substr(0, 1).toUpperCase();
      userNav = (
        <div className="avatar pull-right" style={{backgroundColor: color}}>{letter}</div>
      );
    }

    return (
      <div className="nav-container">
        <nav>
          {userNav}
          <a href="/"><img className="logo" src="/public/images/logo.png" /></a>
        </nav>
        {modal}
      </div>
    );
  }
}

Nav.propTypes = {
  modal: React.PropTypes.shape({
    component: React.PropTypes.func,
  }),
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
    color: React.PropTypes.string,
  }),
  openModal: React.PropTypes.func.isRequired,
};

export default Nav;
