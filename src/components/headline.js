import React from 'react';
import Avatar from './avatar';

class Headline extends React.Component {
  render() {
    const { post } = this.props;
    const preview = post.body.substring(0, 140);
    return (
      <div className="headline">
        <h2><a href={'/p/' + post.urlstring}>{post.title}</a></h2>
        <div className="byline">
          <Avatar name={post.name} hex={post.color} />
          <div className="byline-name">{post.name}</div>
        </div>
        <p className="headline-preview">{preview}</p>
      </div>
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
