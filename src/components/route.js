import React from 'react';
import { connect } from 'react-redux';

const Route = ({ route, name, children }) => ((route === name) ? children : null);
Route.propTypes = {
  route: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  children: React.PropTypes.element.isRequired,
};

export default connect(state => ({ route: state.get('route') }), {})(Route);
