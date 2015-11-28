import React from 'react';

class Nav extends React.Component {
  render() {
    const {modal, openModal} = this.props;
    return (
      <nav>
        <div className="button pull-right" onClick={openModal.bind(this, 'login')}>Log in</div>
        <a href="/"><img className="logo" src="/public/images/logo.png" /></a>
        {(modal) ? React.createElement(modal) : null}
      </nav>
    );
  }
}

Nav.propTypes = {
  modal: React.PropTypes.instanceOf(React.ReactClass),
  openModal: React.PropTypes.func.isRequired,
};

export default Nav;
