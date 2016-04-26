import { setAuthTokenCookieForUserId } from '../auth-token';
import db from '../connection';
import getUserByEmail from '../loaders/get-user-by-email';
import getUserByName from '../loaders/get-user-by-name';
import onError from '../util/on-error';
import { validate, NAME_REX, EMAIL_REX, PASSWORD_REX } from '../validator';
import { createPassHash } from '../passhash';

export default onError(async function createAccount(req, res) {
  let name = req.body.name || '';
  name = name.trim();
  let email = req.body.email || '';
  email = email.trim();
  const password = req.body.password || '';

  if (!name || !validate(NAME_REX, name)) {
    return res.json({ success: false, nameError: 'Invalid name' });
  }
  if (!email || !validate(EMAIL_REX, email)) {
    return res.json({ success: false, emailError: 'Invalid email' });
  }
  if (!password || !validate(PASSWORD_REX, password)) {
    return res.json({ success: false, passwordError: 'Invalid password' });
  }

  const passHash = createPassHash(name, password);
  const color = passHash.substr(0, 6);

  const emailUser = await getUserByEmail(email);
  if (emailUser) {
    return res.json({ success: false, emailError: 'Email is already taken.' });
  }
  const nameUser = await getUserByName(name);
  if (nameUser) {
    return res.json({ success: false, nameError: 'Name is already taken.' });
  }

  const insertResult = await db.one(
    `insert into t_user (name, email, passhash, color, status)
      values ($(name), $(email), $(passHash), $(color), 1)
      returning id, status`,
    { name, email, passHash, color }
  );
  const id = insertResult.id;

  setAuthTokenCookieForUserId(res, id);
  return res.send(JSON.stringify({
    success: true,
    user: {
      id,
      name,
      color,
      status: insertResult.status,
    },
  }));
}, (req, res) => res.status(500).json({ success: false }));
