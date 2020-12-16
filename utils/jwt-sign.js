const jwt = require('jsonwebtoken');
const { devJWT } = require('./config');

const { NODE_ENV, JWT_SECRET } = process.env;

const jwtSign = (id) => jwt.sign({ id }, NODE_ENV === 'production' ? JWT_SECRET : devJWT, { expiresIn: '7d' });

module.exports = jwtSign;
