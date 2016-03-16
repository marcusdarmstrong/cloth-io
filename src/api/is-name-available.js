import getUserByName from '../loaders/get-user-by-name';
import onErrorTry from '../util/on-error-try';
import { validate, NAME_REX } from '../validator';

export default onErrorTry(async function isNameAvailable(req, res) {
  const name = req.query.name;
  if (name && validate(NAME_REX, name)) {
    return res.json({success: !!(await getUserByName(name.trim()))});
  }
  return res.json({success: false});
}, (req, res) => res.status(500).json({success: false}));
