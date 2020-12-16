const mongoose = require('mongoose');
const validator = require('validator');
const {
  REQUIRED_MESSAGE,
  VALIDATION_MESSAGE,
  INCORRECT_LENGTH_MESSAGE,
  REPEATED_EMAIL_ERROR_MESSAGE,
} = require('../utils/utils');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, REQUIRED_MESSAGE('name')],
    minlength: [2, INCORRECT_LENGTH_MESSAGE('Минимальная', 'name', '2')],
    maxlength: [30, INCORRECT_LENGTH_MESSAGE('Максимальная', 'name', '30')],
  },
  email: {
    type: String,
    required: [true, REQUIRED_MESSAGE('email')],
    unique: [true, REPEATED_EMAIL_ERROR_MESSAGE],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: VALIDATION_MESSAGE('email', 'email'),
    },
  },
  password: {
    type: String,
    required: [true, REQUIRED_MESSAGE('password')],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
