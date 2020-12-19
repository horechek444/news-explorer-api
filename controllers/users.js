const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Unautorized = require('../errors/unauthorized');
const ConflictingRequest = require('../errors/conflicting-request');
const NotFoundError = require('../errors/not-found-err');
const jwtSign = require('../utils/jwt-sign');
const {
  BAD_REQUEST_ERROR_CODE,
  LOGIN_FAIL_MESSAGE,
  REPEATED_EMAIL_ERROR_MESSAGE,
  INCORRECT_ID_MESSAGE,
  CAST_ERROR,
} = require('../utils/utils');

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const { email, name } = user;
    if (!user) {
      throw new NotFoundError(INCORRECT_ID_MESSAGE('пользователя'));
    }
    res.send({ email, name });
  } catch (err) {
    if (err.name === CAST_ERROR) {
      err.statusCode = BAD_REQUEST_ERROR_CODE;
    }
    next(err);
  }
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictingRequest(REPEATED_EMAIL_ERROR_MESSAGE);
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then(() => {
          res.send({ email, name });
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unautorized(LOGIN_FAIL_MESSAGE);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unautorized(LOGIN_FAIL_MESSAGE);
          }
          const token = jwtSign(user._id);
          res.send({ token });
        });
    })
    .catch(next);
};

module.exports = {
  createUser, login, getCurrentUser,
};
