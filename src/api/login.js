import getUserByEmail from '../loaders';
import setAuthTokenCookieForUserId from '../auth-token';
import checkPassword from '../passhash';
import onErrorTry from '../util/on-error-try';

export default onErrorTry(async function login(req, res) {
  let email = req.body.email || '';
  email = email.trim();
  const password = req.body.password || '';

  const user = await getUserByEmail(email);
  if (checkPassword(user.name, user.passhash, password)) {
    setAuthTokenCookieForUserId(res, user.id);
    res.send(JSON.stringify({success: true, user: { id: user.id, name: user.name, status: user.status, color: user.color }}));
  } else {
    res.send(JSON.stringify({success: false, error: 'Sorry, that password doesn\'t match'}));
  }
}, (req, res) => res.status(500).send(JSON.stringify({success: false})));
