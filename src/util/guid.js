// @flow

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

export default () => {
  let guid = '';
  for (let i = 0; i < 16; i++) {
    guid += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return guid;
};
