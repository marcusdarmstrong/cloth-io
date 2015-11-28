import React from 'react';

export default () => (
  <form className="login-form">
    <label htmlFor="email">Email address:</label>
    <input type="email" name="email" />
    <label htmlFor="password">Password:</label>
    <input type="password" name="password" />
    <input type="submit" name="submit" value="Log in" />
  </form>
);
