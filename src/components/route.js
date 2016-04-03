import binder from './binder';
import React from 'react';
import { connect } from 'react-redux';

const Route = ({ route, name }) => ((route === name) ? binder(this.props.children) : null);

Route.propTypes = {
  route: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
};

export default connect(state => ({ route: state.get('route') }), {})(Route);
