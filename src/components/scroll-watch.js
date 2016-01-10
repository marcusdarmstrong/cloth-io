import React from 'react';

const scrollTop = () => {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
};

export default class ScrollWatch extends React.Component {
  static propTypes = {
    onScroll: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.markScroll);
    this.scrollHandler = setInterval(this.delegateScroll, 100);
    this.lastScrollTop = 0;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.markScroll);
    clearInterval(this.scrollHandler);
  }

  markScroll = () => {
    this.hasScrolled = true;
  };

  delegateScroll = () => {
    if (this.hasScrolled) {
      const newTop = scrollTop();
      const diff = newTop - this.lastScrollTop;
      this.lastScrollTop = newTop;
      this.props.onScroll(newTop, diff);
      this.hasScrolled = false;
    }
  };

  render() {
    return null;
  }
}
