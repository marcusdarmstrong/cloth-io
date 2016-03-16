import deleteAuthTokenFromCookies from '../auth-token';

export default (req, res) => {
  deleteAuthTokenFromCookies(res);
  res.json({success: true});
};
