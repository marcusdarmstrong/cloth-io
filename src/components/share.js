import React from 'react';
import Nav from './nav';
import ShareForm from './share-form';

const Share = (props) => (
  <div>
    <Nav {...props} noShareForm />
    <div className="spacer">
      <div className="container">
        <ShareForm />
      </div>
    </div>
  </div>
);

export default Share;
