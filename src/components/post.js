import React from 'react';
import Comments from './comments';
import Nav from './nav';
import Socket from './socket';

const Post = (props) => (
  <div>
    <Socket {...props} />
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

Post.propTypes = {
  post: React.PropTypes.shape({
    title: React.PropTypes.string,
    body: React.PropTypes.string,
  }),
};

export default Post;
