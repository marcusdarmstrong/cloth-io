import React from 'react';
import Comments from './comments';
import Nav from './nav';
import uriParser from '../util/uri-parser';

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
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    url: React.PropTypes.string,
  }),
};

export default Post;
