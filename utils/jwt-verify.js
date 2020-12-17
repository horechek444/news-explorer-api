const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const jwtVerify = async (token) => {
  try {
    return await jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return console.log(err);
  }
};

module.exports = jwtVerify;
