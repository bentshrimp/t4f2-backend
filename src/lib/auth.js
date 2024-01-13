const { rejects } = require('node:assert');
const crypto = require('node:crypto');
const { resolve } = require('node:path');

const createSalt = async () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('base64'));
      }
    });
  });
};

const createHashedPassword = (plainPwd, salt = null) => {
  return new Promise(async (resolve, reject) => {
    if (!salt) {
      salt = await createSalt();
    }
    crypto.pbkdf2(plainPwd, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) {
        reject(err);
      } else {
        resolve({ hashedPwd: key.toString('base64'), salt: salt });
      }
    });
  });
};

module.exports = {
  createSalt,
  createHashedPassword,
};
