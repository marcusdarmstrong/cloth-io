import React from 'react';

export default ({posts}) => {
  return (
    <div>
      <p>Hello World! This is the homepage.</p>
      {posts.map(post => (<a href={post.urlstring}>{post.title}</a>))}
    </div>
  );
};
