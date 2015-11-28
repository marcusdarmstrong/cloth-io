import React from 'react';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {email: '', password: ''};
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
  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="create-account-cta">
          <div className="button pull-right" onClick={this.props.openModal.bind(this, 'signup')}>Create account</div>
          <div>New here?</div>
        </div>
        <label htmlFor="email">Email address:</label>
        <input type="email" autoFocus name="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
        <input type="submit" name="submit" value="Log in" />
      </form>
    );
  }
}

LoginForm.propTypes = {
  openModal: React.PropTypes.func.isRequired,
};

export default LoginForm;
