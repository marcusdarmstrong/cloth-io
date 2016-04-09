import React from 'react';
import Avatar from './avatar';
import TimeAgo from './time-ago';
import previewer from '../util/previewer';
import uriParser from '../util/uri-parser';

// eslint-disable-next-line
export default class Headline extends React.Component {
  static propTypes = {
    post: React.PropTypes.shape({
      urlstring: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      body: React.PropTypes.string.isRequired,
      created: React.PropTypes.number.isRequired,
      commentcount: React.PropTypes.number.isRequired,
      url: React.PropTypes.string,
      name: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired,
    }),
    hasSeparator: React.PropTypes.bool,
  };

  render() {
    const { post, hasSeparator } = this.props;
    const preview = previewer(post.body);
    const ts = Number(post.created);
    const commentCount = Number(post.commentcount);
    let commentCountText = 'Read More';
    if (commentCount === 1) {
      commentCountText = '1 Comment';
    } else if (commentCount > 1) {
      commentCountText = `${commentCount} Comments`;
    }

    const link = (post.url) ? uriParser(post.url).host : null;
    const postLink = `/p/${post.urlstring}`;
    if (link) {
      return (
        <div>
          {(hasSeparator) ? (<div className="separator">&nbsp;</div>) : null}
          <div className="headline">
            <a href={post.url} target="_new" className="headline-link">
              <h2>{post.title}</h2>
              <span className="link-desc">{link} &crarr;</span>
            </a>
            <a href={postLink} className="headline-details">
              <Avatar user={post} />
              <div className="byline">
                <TimeAgo timestamp={ts} />
                <div className="byline-name">{post.name}</div>
                <p className="headline-preview" dangerouslySetInnerHTML={{ __html: preview }}></p>
                <div className="comment-count">{commentCountText}</div>
              </div>
            </a>
          </div>
        </div>
      );
    }
    return (
      <div>
        {(hasSeparator) ? (<div className="separator">&nbsp;</div>) : null}
        <a href={postLink} className="headline">
          <h2>{post.title}</h2>
          <div className="headline-details">
            <Avatar name={post.name} hex={post.color} />
            <div className="byline">
              <TimeAgo timestamp={ts} />
              <div className="byline-name">{post.name}</div>
              <p className="headline-preview" dangerouslySetInnerHTML={{ __html: preview }}></p>
              <div className="comment-count">{commentCountText}</div>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
