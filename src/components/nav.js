// @flow

import React from 'react';
import ScrollWatch from './scroll-watch';
import Avatar from './avatar';
import Button from './button';

import type { User } from '../entities/user';

export type Props = {
  user?: User,
  openModal: () => void,
  loginUser: () => void,
  noShareForm?: boolean,
};

export default class Nav extends React.Component {

  state: {
    signOut: boolean,
    hidden: boolean,
  } = {
    signOut: false,
    hidden: false,
  };

  props: Props;

  showSignoutLink: () => void = () => this.setState({ signOut: true });

  signOut: () => void = () => {
    this.setState({ signOut: false });
    fetch('/api/signOut', { credentials: 'same-origin' })
      .then(() => this.props.loginUser(null));
  };

  handleScroll: (newTop: number, diff: number) => void = (newTop, diff) => {
    const delta = Math.abs(diff);
    if (delta <= 5) {
      return;
    }

    if (diff > 0 && newTop > 44) {
      this.setState({ hidden: true });
    } else if (diff < 0) {
      this.setState({ hidden: false });
    }
  };

  openLoginModal: () => void = () => this.props.openModal('login');

  render() {
    let userNav = <Button classNames="pull-right" onClick={this.openLoginModal}>Log in</Button>;
    if (this.props.user) {
      if (this.state.signOut) {
        userNav = <Button className="pull-right" onClick={this.signOut}>Log out</Button>;
      } else {
        userNav = (
          <Avatar
            user={this.props.user} onClick={this.showSignoutLink} className="pull-right"
          />
        );
      }
    }

    const noShareForm = this.props.noShareForm || !this.props.user || this.props.user.status === 0;

    return (
      <div className={this.state.hidden ? 'hidden-nav nav-container' : 'nav-container'}>
        <ScrollWatch onScroll={this.handleScroll} />
        <nav>
          {userNav}
          {(noShareForm) ? null : <Button className="pull-left" href="/share">Share</Button>}
          <a href="/"><img className="logo" src="/public/images/logo.png" alt="cloth.io" /></a>
        </nav>
      </div>
    );
  }
}
