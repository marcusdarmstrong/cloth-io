import getUserByName from '../loaders/get-user-by-name';
import { validate, NAME_REX } from '../validator';

export default async function isNameAvailable(name) {
  if (name && validate(NAME_REX, name)) {
    return { success: !(await getUserByName(name.trim())) };
  }
  return { success: false };
};
