import React from 'react';
import Avatar from './avatar';
import Byline from './byline';
import uriParser from '../util/uri-parser';

const Headline = ({ post, hasSeparator }) => {
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
            <Avatar user={post.user} />
            <Byline post={post} />
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
          <Avatar user={post.user} />
          <Byline post={post} />
        </div>
      </a>
    </div>
  );
};

Headline.propTypes = {
  post: React.PropTypes.shape({
    urlstring: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired,
    created: React.PropTypes.number.isRequired,
    commentcount: React.PropTypes.number.isRequired,
    url: React.PropTypes.string,
    user: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired,
    }).isRequired,
  }),
  hasSeparator: React.PropTypes.bool,
};

export default Headline;
