import getUserByEmail from '../loaders/get-user-by-email';
import { validate, EMAIL_REX } from '../validator';

export default async function isEmailAvailable(email) {
  if (email && validate(EMAIL_REX, email)) {
    return { success: !(await getUserByEmail(email.trim())) };
  }
  return { success: false };
};
