export const EMAIL_REX = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
export const NAME_REX = /^[a-zA-Z0-9-_ ]{4,20}$/i;
export const PASSWORD_REX = /^.{6,}$/i;

export function validate(rex, str) {
  return rex.test(str);
}
