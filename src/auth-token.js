// @flow
import md5 from 'md5';
import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const password = process.env.AUTH_TOKEN_PASSWORD || '';
const cookieName = 'auth';

type CookieOptions = {
  maxAge: number,
  httpOnly: boolean,
};
type Response = {
  cookie: (name: string, value: string, options: CookieOptions) => void,
};

export function createAuthToken(id: number) {
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

export function decodeAuthToken(token: string) {
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

export function readAuthTokenFromCookies(req: Request) {
  return req.cookies && decodeAuthToken(req.cookies[cookieName]);
}

export function setAuthTokenCookieForUserId(res: Response, userId: number) {
  const cookieVal = createAuthToken(userId);
  if (cookieVal) {
    res.cookie(cookieName, cookieVal, {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 2,
      httpOnly: true,
    });
  }
}

export function deleteAuthTokenFromCookies(res: Response) {
  res.cookie(cookieName, '', { maxAge: 0, httpOnly: true });
}
