import React from 'react';
import Comments from './comments';
import Nav from './nav';
import uriParser from '../uri-parser';

const Post = (props) => {
  const link = (props.post.url) ? uriParser(props.post.url).host : null;
  if (link) {
    return (
      <div>
        <Nav {...props} />
        <div className="spacer">
          <div className="container">
            <article className="article">
              <a href={props.post.url} target="_new" className="headline-link">
                <h1>{props.post.title}</h1>
                <span className="link-desc">{link} &crarr;</span>
              </a>
              <div dangerouslySetInnerHTML={{__html: props.post.body}}></div>
            </article>
            <Comments {...props}/>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav {...props} />
      <div className="spacer">
        <div className="container">
          <article className="article">
            <h1>{props.post.title}</h1>
            <div dangerouslySetInnerHTML={{__html: props.post.body}}></div>
          </article>
          <Comments {...props}/>
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
