import React from 'react';
import Avatar from './avatar';
import TimeAgo from './time-ago';
import previewer from '../previewer';

class Headline extends React.Component {
  render() {
    const { post } = this.props;
    const preview = previewer(post.body);
    const ts = Number(post.created);
    const commentCount = Number(post.commentcount);
    let commentCountText = 'Read More';
    if (commentCount === 1) {
      commentCountText = '1 Comment';
    } else if (commentCount > 1) {
      commentCountText = commentCount + ' Comments';
    }
    return (
      <div>
        <div className="separator">&middot;&nbsp;&middot;&nbsp;&middot;</div>
        <a href={'/p/' + post.urlstring} className="headline">
          <h2>{post.title}</h2>
          <div className="headline-details">
            <Avatar name={post.name} hex={post.color} />
            <div className="byline">
              <TimeAgo timestamp={ts} />
              <div className="byline-name">{post.name}</div>
              <p className="headline-preview" dangerouslySetInnerHTML={{__html: preview}}></p>
              <div className="comment-count">{commentCountText}</div>
            </div>
          </div>
        </a>
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
