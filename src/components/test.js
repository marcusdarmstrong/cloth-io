import React from 'react';

const Child = ({ a, b, parentData }) => <div><span>{a} {b}</span><span>{parentData}</span></div>;
Child.propTypes = {
  a: React.PropTypes.string.isRequired,
  b: React.PropTypes.string,
  parentData: React.PropTypes.string.isRequired,
};

const Parent = ({ childData }) => <Child {...childData} parentData="hello world" />;
Parent.propTypes = {
  childData: React.PropTypes.shape(Child.propTypes).isRequired,
};

export default Parent;
