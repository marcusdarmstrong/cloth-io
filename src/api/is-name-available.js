import getUserByName from '../loaders/get-user-by-name';
import onError from '../util/on-error';
import { validate, NAME_REX } from '../validator';

export default onError(async function isNameAvailable(req, res) {
  const name = req.query.name;
  if (name && validate(NAME_REX, name)) {
    return res.json({ success: !!(await getUserByName(name.trim())) });
  }
  return res.json({ success: false });
}, (req, res) => res.status(500).json({ success: false }));
