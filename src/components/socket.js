import * as actions from '../actions';
import React from 'react';

// The only purpose of this component is to map socket.io events to redux actions.
class Socket extends React.Component {
  componentDidMount() {
    actions.map(action => this.props.socket.on(action, (data) => this.props[action](data)));
  }
  render() {
    return null;
  }
}

Socket.propTypes = {
  socket: React.PropTypes.object.isRequired,
};

export default Socket;
