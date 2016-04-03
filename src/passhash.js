import scrypt from 'scrypt';

export function createPassHash(salt, password) {
  return scrypt.hashSync(password, { N: 16384, r: 8, p: 1 }, 64, new Buffer(salt)).toString('hex');
}

export function checkPassword(salt, password, passhash) {
  return salt && password && passhash && createPassHash(salt, password) === passhash;
}
