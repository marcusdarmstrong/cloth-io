import getUserByEmail from '../loaders/get-user-by-email';
import onError from '../util/on-error';
import { validate, EMAIL_REX } from '../validator';

export default onError(async function isEmailAvailable(req, res) {
  const email = req.query.email;
  if (email && validate(EMAIL_REX, email)) {
    return res.json({ success: !(await getUserByEmail(email.trim())) });
  }
  return res.json({ success: false });
}, (req, res) => res.status(500).json({ success: false }));
