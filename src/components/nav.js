import React from 'react';

class Nav extends React.Component {
  openLogin() {
    alert('hi');
  }

  render() {
    return (
      <nav>
        <div className="button pull-right" onClick={this.openLogin}>Log in</div>
        <a href="/"><img className="logo" src="/public/images/logo.png" /></a>
      </nav>
    );
  }
}

export default Nav;
