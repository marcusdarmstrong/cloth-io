import getUserByEmail from '../loaders/get-user-by-email';
import { setAuthTokenCookieForUserId } from '../auth-token';
import { checkPassword } from '../passhash';
import onError from '../util/on-error';

export default onError(async function login(req, res) {
  let email = req.body.email || '';
  email = email.trim();
  const password = req.body.password || '';

  const user = await getUserByEmail(email);
  if (checkPassword(user.name, user.passhash, password)) {
    setAuthTokenCookieForUserId(res, user.id);
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        status: user.status,
        color: user.color,
      },
    });
  } else {
    res.json({ success: false, error: 'Sorry, that password doesn\'t match' });
  }
}, (req, res) => res.status(500).json({ success: false }));
