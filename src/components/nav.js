import React from 'react';
import Modal from './modal';
import ScrollWatch from './scroll-watch';

export default class Nav extends React.Component {
  static propTypes = {
    modal: React.PropTypes.shape({
      component: React.PropTypes.func.isRequired,
    }),
    user: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired,
      status: React.PropTypes.number.isRequired,
    }),
    openModal: React.PropTypes.func.isRequired,
    loginUser: React.PropTypes.func.isRequired,
    noShareForm: React.PropTypes.bool,
  };

  state = {
    signOut: false,
    hidden: false,
  };

  showSignoutLink = () => {
    this.setState({signOut: true});
  };

  signOut = () => {
    this.setState({signOut: false});
    fetch('/api/signOut', {credentials: 'same-origin'})
      .then(() => this.props.loginUser(null));
  };

  handleScroll = (newTop, diff) => {
    const delta = Math.abs(diff);
    if (delta <= 5) {
      return;
    }

    if (diff > 0 && newTop > 44) {
      this.setState({hidden: true});
    } else if (diff < 0) {
      this.setState({hidden: false});
    }
  };

  openLoginModal = () => {
    return this.props.openModal('login');
  };

  render() {
    let modal = null;
    if (this.props.modal) {
      modal = React.createElement(
        Modal,
        this.props,
        React.createElement(this.props.modal.component, this.props)
      );
    }

    let userNav = (<div className="button pull-right" onClick={this.openLoginModal}>Log in</div>);
    if (this.props.user) {
      if (this.state.signOut) {
        userNav = (
          <div className="button pull-right" onClick={this.signOut}>Log out</div>
        );
      } else {
        const color = '#' + this.props.user.color;
        const letter = this.props.user.name.substr(0, 1).toUpperCase();
        userNav = (
          <div className="avatar pull-right" style={{backgroundColor: color}} onClick={this.showSignoutLink}>{letter}</div>
        );
      }
    }

    const noShareForm = this.props.noShareForm || !this.props.user || this.props.user.status === 0;

    return (
      <div className={this.state.hidden ? 'hidden-nav nav-container' : 'nav-container'}>
        <ScrollWatch onScroll={this.handleScroll} />
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
