const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Unautorized = require('../errors/unauthorized');
const ConflictingRequest = require('../errors/conflicting-request');
const NotFoundError = require('../errors/not-found-err');
const jwtSign = require('../utils/jwt-sign');
const { ERROR_CODE } = require('../utils/error-code');

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const { email, name } = user;
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }
    res.send({ email, name });
  } catch (err) {
    if (err.name === 'CastError') {
      err.statusCode = ERROR_CODE;
    }
    next(err);
  }
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictingRequest('Уже есть такой email');
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
        throw new Unautorized('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unautorized('Неправильные почта или пароль');
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
