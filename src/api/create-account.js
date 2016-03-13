import setAuthTokenCookieForUserId from '../auth-token';
import connect from '../connection';
import sql from '../util/sql';
import getUserByEmail from '../loaders/get-user-by-email';
import getUserByName from '../loaders/get-user-by-name';
import onErrorTry from '../util/on-error-try';
import { validate, NAME_REX, EMAIL_REX, PASSWORD_REX } from '../validator';
import createPassHash from '../passhash';

export default onErrorTry(async function createAccount(req, res) {
  let name = req.body.name || '';
  name = name.trim();
  let email = req.body.email || '';
  email = email.trim();
  const password = req.body.password || '';

  if (!name || !validate(NAME_REX, name)) {
    return res.send(JSON.stringify({success: false, nameError: 'Invalid name'}));
  }
  if (!email || !validate(EMAIL_REX, email)) {
    return res.send(JSON.stringify({success: false, emailError: 'Invalid email'}));
  }
  if (!password || !validate(PASSWORD_REX, password)) {
    return res.send(JSON.stringify({success: false, passwordError: 'Invalid password'}));
  }

  const passHash = createPassHash(name, password);
  const color = passHash.substr(0, 6);
  const db = connect();

  const emailUser = await getUserByEmail(email, db);
  if (emailUser) {
    return res.send(JSON.stringify({success: false, emailError: 'Email is already taken.'}));
  }
  const nameUser = await getUserByName(name, db);
  if (nameUser) {
    res.send(JSON.stringify({success: false, nameError: 'Name is already taken.'}));
  }

  const insertResult = await db.one(sql`insert into t_user (name, email, passhash, color) values (${name}, ${email}, ${passHash}, ${color}) returning id, status`);
  const id = insertResult.id;

  setAuthTokenCookieForUserId(res, id);
  return res.send(JSON.stringify({success: true, user: { id, name, color, status: insertResult.status }}));
}, (req, res) => res.status(500).send(JSON.stringify({success: false})));