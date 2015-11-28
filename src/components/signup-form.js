import React from 'react';

class SignupForm extends React.Component {
  getInitialState() {
    return {name: '', email: '', password: ''};
  }
  handleNameChange(e) {
    this.setState({name: e.target.value});
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
      <form className="login-form" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Display name:</label>
        <input type="text" autoFocus name="name" value={this.state.name} onChange={this.handleNameChange} />
        <label htmlFor="email">Email address:</label>
        <input type="email" name="email" value={this.state.email} onChange={this.handleEmailChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
        <input type="submit" name="submit" value="Create account" />
      </form>
    );
  }
}

export default SignupForm;
