import React from 'react';

function numToString(num) {
  switch (num) {
  case 1:
    return 'One';
  case 2:
    return 'Two';
  case 3:
    return 'Three';
  case 4:
    return 'Four';
  case 5:
    return 'Five';
  case 6:
    return 'Six';
  case 7:
    return 'Seven';
  case 8:
    return 'Eight';
  case 9:
    return 'Nine';
  case 10:
    return 'Ten';
  default:
    return num;
  }
}

class TimeAgo extends React.Component {
  componentDidMount() {
    this.tick();
  }
  componentDidUpdate(lastProps) {
    if (this.props.timestamp !== lastProps.timestamp) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
      }
      this.tick();
    }
  }
  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
  tick() {
    const then = this.props.timestamp;
    const now = Math.round(Date.now() / 1000);
    const seconds = Math.abs(now - then);

    let period = 35000;
    if (seconds > 60 * 60) {
      period = 1000 * 60 * 35;
    } else {
      period = 0;
    }

    if (!!period) {
      this.timeoutId = setTimeout(this.tick.bind(this), period);
    }
    this.forceUpdate();
  }
  render() {
    const then = this.props.timestamp;
    const now = Math.round(Date.now() / 1000);
    const seconds = Math.abs(now - then);

    let value;
    if (seconds < 50) {
      value = 'Just now';
    } else if (seconds < 90) {
      value = 'One minute ago';
    } else if (seconds < 60 * 50) {
      value = numToString(Math.round(seconds / 60)) + ' minutes ago';
    } else if (seconds < 60 * 90) {
      value = 'One hour ago';
    } else if (seconds < 60 * 60 * 24) {
      value = numToString(Math.round(seconds / 3600)) + ' hours ago';
    } else {
      value = (new Date(then * 1000)).toLocaleDateString();
    }

    return (<div className="comment-timestamp pull-right">{value}</div>);
  }
}

TimeAgo.propTypes = { timestamp: React.PropTypes.number.isRequired };

export default TimeAgo;
