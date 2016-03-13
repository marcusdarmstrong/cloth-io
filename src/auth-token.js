import md5 from 'md5';
import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const password = process.env.AUTH_TOKEN_PASSWORD;
const cookieName = 'auth';

export function createAuthToken(id) {
  if (!id) {
    return null;
  }
  const manifest = [Number(id), md5(id.toString())];
  const text = JSON.stringify(manifest);

  const cipher = crypto.createCipher(algorithm, password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

export function decodeAuthToken(token) {
  if (!token) {
    return null;
  }
  const decipher = crypto.createDecipher(algorithm, password);
  let dec = decipher.update(token, 'hex', 'utf8');
  dec += decipher.final('utf8');
  const manifest = JSON.parse(dec);

  if (manifest && manifest.length === 2 && md5(manifest[0].toString()) === manifest[1]) {
    return manifest[0];
  }
  return null;
}

export function readAuthTokenFromCookies(req) {
  return req.cookies && decodeAuthToken(req.cookies[cookieName]);
}

export function setAuthTokenCookieForUserId(res, userId) {
  res.cookie(cookieName, createAuthToken(userId), {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 2,
    httpOnly: true,
  });
}

export function deleteAuthTokenFromCookies(res) {
  res.cookie(cookieName, '', { maxAge: 0, httpOnly: true });
}
