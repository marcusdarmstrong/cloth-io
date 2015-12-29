import React from 'react';

const scrollTop = () => {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
};

class ScrollWatch extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.markScroll.bind(this));
    this.scrollHandler = setInterval(this.delegateScroll.bind(this), 100);
    this.lastScrollTop = 0;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.markScroll.bind(this));
    clearInterval(this.scrollHandler);
  }

  markScroll() {
    this.hasScrolled = true;
  }

  delegateScroll() {
    if (this.hasScrolled) {
      const newTop = scrollTop();
      const diff = newTop - this.lastScrollTop;
      this.lastScrollTop = newTop;
      this.props.onScroll(newTop, diff);
      this.hasScrolled = false;
    }
  }

  render() {
    return null;
  }
}

ScrollWatch.propTypes = {
  onScroll: React.PropTypes.func.isRequired,
};

export default ScrollWatch;
