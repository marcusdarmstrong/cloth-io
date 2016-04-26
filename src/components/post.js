import React from 'react';
import uriParser from '../util/uri-parser';
import Avatar from './avatar';
import TimeAgo from './time-ago';

const Post = ({ post }) => {
  const link = (post.url) ? uriParser(post.url).host : null;
  const title = (link) ? (
    <a href={post.url} target="_new" className="headline-link">
      <h1>{post.title}</h1>
      <span className="link-desc">{link} &crarr;</span>
    </a>
  ) : (
    <h1>{post.title}</h1>
  );

  return (
    <article className="article">
      <div className="article-title">{title}</div>
      <div className="post-attribution">
        <Avatar user={post.user} />
        <div className="attribution-info">
          <span className="attribution-name">{post.user.name}</span>
          <span className="post-time"><TimeAgo timestamp={post.created} /></span>
        </div>
      </div>
      <div className="article-body" dangerouslySetInnerHTML={{ __html: post.body }}></div>
    </article>
  );
};

Post.propTypes = {
  post: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired,
    url: React.PropTypes.string,
    created: React.PropTypes.number.isRequired,
    user: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired,
    }),
  }),
};

export default Post;
