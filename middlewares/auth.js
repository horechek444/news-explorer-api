const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');
const { UNAUTHORIZED_MESSAGE } = require('../utils/utils');
const { devJWT } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized(UNAUTHORIZED_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devJWT);
  } catch (err) {
    throw new Unauthorized(UNAUTHORIZED_MESSAGE);
  }

  req.user = payload;

  next();
};
