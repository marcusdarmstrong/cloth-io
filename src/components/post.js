import React from 'react';
import Comments from './comments';

export default ({post, comments}) => (
  <div className="container">
    <article className="article">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{__html: post.body}}></div>
    </article>
    <Comments comments={comments} />
  </div>
);
