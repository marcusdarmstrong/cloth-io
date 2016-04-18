import React from 'react';

const CommentIndent = ({ nestLevel, children }) => {
  let markup = children;
  for (let i = nestLevel; i > 0; i--) {
    markup = (<div className="reply-container"><div className="reply">{markup}</div></div>);
  }
  return markup;
};

CommentIndent.propTypes = {
  nestLevel: React.PropTypes.number.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element),
  ]),
};

export default CommentIndent;
