import getUserByEmail from '../loaders/get-user-by-email';
import onErrorTry from '../util/on-error-try';
import { validate, EMAIL_REX } from '../validator';

export default onErrorTry(async function isEmailAvailable(req, res) {
  const email = req.query.email;
  if (email && validate(EMAIL_REX, email)) {
    return res.send(JSON.stringify({success: !!(await getUserByEmail(email.trim()))}));
  }
  return res.send(JSON.stringify({success: false}));
}, (req, res) => res.status(500).send(JSON.stringify({success: false})));
