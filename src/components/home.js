import React from 'react';

export default ({posts}) => {
  return (
    <div>
      <p>Hello World! This is the homepage.</p>
      {posts.map(post => (<a href={'/p/' + post.urlstring}>{post.title}</a>))}
    </div>
  );
};
