import React from 'react';
import Comments from './comments';
import Nav from './nav';
import uriParser from '../util/uri-parser';
import Avatar from './avatar';
import TimeAgo from './time-ago';

const Post = (props) => {
  const link = (props.post.url) ? uriParser(props.post.url).host : null;
  const title = (link) ? (
    <a href={props.post.url} target="_new" className="headline-link">
      <h1>{props.post.title}</h1>
      <span className="link-desc">{link} &crarr;</span>
    </a>
  ) : (
    <h1>{props.post.title}</h1>
  );

  return (
    <div>
      <Nav {...props} />
      <div className="spacer">
        <div className="container">
          <article className="article">
            {title}
            <div className="post-attribution">
              <Avatar name={props.post.user.name} hex={props.post.user.color} />
              {props.post.user.name}
              <span className="post-time">
                <TimeAgo timestamp={props.post.created} />
              </span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: props.post.body }}></div>
          </article>
          <Comments {...props} />
        </div>
      </div>
    </div>
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
