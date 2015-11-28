import React from 'react';

class Nav extends React.Component {
  render({modal, openModal}) {
    return (
      <nav>
        <div className="button pull-right" onClick={openModal.bind(this, 'login')}>Log in</div>
        <a href="/"><img className="logo" src="/public/images/logo.png" /></a>
        {(modal) ? React.createElement(modal) : null}
      </nav>
    );
  }
}

export default Nav;
