import React from 'react';

export default () => (
  <form className="signup-form">
    <label htmlFor="name">Display name:</label>
    <input type="text" name="name" />
    <label htmlFor="email">Email address:</label>
    <input type="email" name="email" />
    <label htmlFor="password">Password:</label>
    <input type="password" name="password" />
    <input type="submit" name="submit" value="Sign up" />
  </form>
);
