import React from 'react';
import Nav from './nav';
import ShareForm from './share-form';

const Share = (props) => {
  return (
    <div>
      <Nav {...props} />
      <div className="spacer">
        <div className="container">
          <ShareForm posts={props.user} />
        </div>
      </div>
    </div>
  );
};

Share.propTypes = {
  user: React.PropTypes.object,
};

export default Share;
