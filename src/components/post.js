import React from 'react';

export default ({post}) => (
  <article className="article">
    <h1>{post.title}</h1>
    <div dangerouslySetInnerHTML={post.body}></div>
  </article>
);
