import React from 'react';

class LoginForm extends React.Component {
  getInitialState() {
    return {email: '', password: ''};
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  render(props) {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <div className="create-account-cta">
          <div className="button pull-right" onClick={props.openModal.bind(this, 'signup')}>Create account</div>
          <div>New here?</div>
        </div>
        <label htmlFor="email">Email address:</label>
        <input type="email" autoFocus name="email" value={this.state.email}/>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={this.state.password}/>
        <input type="submit" name="submit" value="Log in" />
      </form>
    );
  }
}

export default LoginForm;
