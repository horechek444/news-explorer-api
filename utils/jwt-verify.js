const jwt = require('jsonwebtoken');
const { devJWT } = require('./config');

const { NODE_ENV, JWT_SECRET } = process.env;

const jwtVerify = async (token) => {
  try {
    return await jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devJWT);
  } catch (err) {
    return console.log(err);
  }
};

module.exports = jwtVerify;
