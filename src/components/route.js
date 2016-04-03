import binder from './binder';
import React from 'react';
import { connect } from 'react-redux';

class Route extends React.Component {
  static propTypes = {
    route: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
  };

  render() {
    const { route, name, children } = this.props;
    return ((route === name) ? binder(children) : null);
  }
}

export default connect(state => ({ route: state.get('route') }), {})(Route);
