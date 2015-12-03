import React from 'react';

class Headline extends React.Component {
  render() {
    return (
      <h2><a href={'/p/' + this.props.post.urlstring}>{this.props.post.title}</a></h2>
    );
  }
}

Headline.propTypes = {
  post: React.PropTypes.shape({
    urlstring: React.PropTypes.string,
    title: React.PropTypes.string,
  }),
};

export default Headline;
