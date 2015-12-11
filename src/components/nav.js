import React from 'react';
import Modal from './modal';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {signOut: false};
  }
  showSignoutLink() {
    this.setState({signOut: true});
  }
  signOut() {
    this.setState({signOut: false});
    fetch('/api/signOut', {credentials: 'same-origin'})
      .then(() => this.props.loginUser(null));
  }
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
      if (this.state.signOut) {
        userNav = (
          <div className="button pull-right" onClick={this.signOut.bind(this)}>Log out</div>
        );
      } else {
        const color = '#' + this.props.user.color;
        const letter = this.props.user.name.substr(0, 1).toUpperCase();
        userNav = (
          <div className="avatar pull-right" style={{backgroundColor: color}} onClick={this.showSignoutLink.bind(this)}>{letter}</div>
        );
      }
    }

    const noShareForm = this.props.noShareForm || !this.props.user || this.props.user.status === 0;

    return (
      <div className="nav-container">
        <nav>
          {userNav}
          {(noShareForm) ? '' : (<a className="button pull-left" href="/share">Share</a>)}
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
    status: React.PropTypes.number,
  }),
  openModal: React.PropTypes.func.isRequired,
  loginUser: React.PropTypes.func.isRequired,
  noShareForm: React.PropTypes.bool,
};

export default Nav;
