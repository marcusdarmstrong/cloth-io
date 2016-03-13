import getUserByName from '../loaders/get-user-by-name';
import onErrorTry from '../util/on-error-try';
import { validate, NAME_REX } from '../validator';

export default onErrorTry(async function isNameAvailable(req, res) {
  const name = req.query.name;
  if (name && validate(NAME_REX, name)) {
    return res.send(JSON.stringify({success: !!(await getUserByName(name.trim()))}));
  }
  return res.send(JSON.stringify({success: false}));
}, (req, res) => res.status(500).send(JSON.stringify({success: false})));
