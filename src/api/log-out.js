import deleteAuthTokenFromCookies from '../auth-token';

export default (req, res) => {
  deleteAuthTokenFromCookies(res);
  res.send(JSON.stringify({success: true}));
};
