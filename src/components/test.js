import React from 'react';

const omit = (obj, keys) => {
  const newObj = {};
  for (const key of Object.keys(obj)) {
    if (keys.indexOf(key) === -1) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

const Child = ({ a, b, parentData }) => <div><span>{a} {b}</span><span>{parentData}</span></div>;
Child.propTypes = {
  a: React.PropTypes.string.isRequired,
  b: React.PropTypes.string,
  parentData: React.PropTypes.string.isRequired,
};

const Parent = ({ childData }) => <Child {...childData} parentData="hello world" />;
Parent.propTypes = {
  childData: React.PropTypes.shape(omit(Child.propTypes, ['parentData'])).isRequired,
};

export default Parent;

/*
 * <Parent childData={{ a: 'Hi', b: 'Place', parentData: 'lol' }} />
 *
 * yields:
 *
 * <div><span>Hi Place</span><span>hello world</span></div>
 */
