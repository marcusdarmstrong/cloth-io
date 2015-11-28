import React from 'react';
import Comments from './comments';
import Nav from './nav';

export default (props) => (
  <div>
    <Nav {...props} />
    <div className="spacer">
      <div className="container">
        <article className="article">
          <h1>{props.post.title}</h1>
          <div dangerouslySetInnerHTML={{__html: props.post.body}}></div>
        </article>
        <Comments {...props} />
      </div>
    </div>
  </div>
);
