import React from 'react';
import Avatar from './avatar';
import TimeAgo from './time-ago';
import previewer from '../previewer';

class Headline extends React.Component {
  render() {
    const { post } = this.props;
    const preview = previewer(post.body);
    return (
      <a href={'/p/' + post.urlstring} className="headline">
        <h2>{post.title}</h2>
        <div className="headline-details">
          <Avatar name={post.name} hex={post.color} />
          <div className="byline">
            <TimeAgo timestamp={post.created} />
            <div className="byline-name">{post.name}</div>
          </div>
          <p className="headline-preview">{preview}</p>
          <div className="button">Read More</div>
        </div>
      </a>
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
