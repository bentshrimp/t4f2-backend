const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const signToken = (payload, expire) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, { expiresIn: expire }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) reject(err);
      resolve({ returnValue: true, decoded: decoded });
    });
  });
};

const authToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const refreshHeader = req.headers['refresh'];
  const accessToken = authHeader && authHeader.split(' ')[1];
  const refreshToken = refreshHeader && refreshHeader.split(' ')[1];

  let accessResult;
  let refreshResult;
  try {
    accessResult = await verifyToken(accessToken);
  } catch (err) {
    accessResult = { returnValue: false, errorMsg: err };
  }
  if (accessResult.returnValue) {
    next();
  } else {
    try {
      refreshResult = await verifyToken(refreshToken);
    } catch (err) {
      refreshResult = { returnValue: false, errorMsg: err };
    }
    if (refreshResult.returnValue) {
      // sign new access token
      // res.setHeaders('Authorization', 'Bearer ' + );
    } else {
      res.status(401).json({ msg: 'invalid token' });
    }
  }
};

module.exports = {
  signToken,
  verifyToken,
  authToken,
};
