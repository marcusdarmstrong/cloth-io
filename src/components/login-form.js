import React from 'react';

export default () => (
  <form className="login-form">
    <div className="create-account-cta">
      <div className="button pull-right">Create Account</div>
      <div>New here?</div>
    </div>
    <label htmlFor="email">Email address:</label>
    <input type="email" autoFocus name="email" />
    <label htmlFor="password">Password:</label>
    <input type="password" name="password" />
    <input type="submit" name="submit" value="Log in" />
  </form>
);
