import React from 'react';
import Button from './button';

export default class LoginForm extends React.Component {
  static propTypes = {
    openModal: React.PropTypes.func.isRequired,
    closeModal: React.PropTypes.func.isRequired,
    loginUser: React.PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
    error: '',
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.email === '') {
      this.setState({ error: 'Please provide an email.' });
      return;
    }
    if (this.state.password === '') {
      this.setState({ error: 'Please provide a password.' });
      return;
    }

    fetch('/api/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    }).then(res => res.json())
      .then(data => {
        if (data.success) {
          this.props.closeModal();
          this.props.loginUser(data.user);
        } else {
          this.setState({ error: data.error });
        }
      });
  };

  openSignupModal = () => this.props.openModal('signup');

  render() {
    const errorState = (this.state.error === '') ?
      null : (<p className="error">{this.state.error}</p>);
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <div className="create-account-cta">
          <Button classNames="pull-right" onClick={this.openSignupModal}>
            Create account
          </Button>
          <div>New here?</div>
        </div>
        {errorState}
        <label htmlFor="email">Email address:</label>
        <input
          type="email" autoFocus name="email"
          value={this.state.email} onChange={this.handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password" name="password"
          value={this.state.password} onChange={this.handlePasswordChange}
        />
        <input type="submit" name="submit" value="Log in" />
      </form>
    );
  }
}
