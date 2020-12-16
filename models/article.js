const mongoose = require('mongoose');
const validator = require('validator');
const { REQUIRED_MESSAGE, VALIDATION_MESSAGE } = require('../utils/utils');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, REQUIRED_MESSAGE('keyword')],
  },
  title: {
    type: String,
    required: [true, REQUIRED_MESSAGE('title')],
  },
  text: {
    type: String,
    required: [true, REQUIRED_MESSAGE('text')],
  },
  date: {
    type: String,
    required: [true, REQUIRED_MESSAGE('date')],
  },
  source: {
    type: String,
    required: [true, REQUIRED_MESSAGE('source')],
  },
  link: {
    type: String,
    required: [true, REQUIRED_MESSAGE('link')],
    validate: {
      validator: (url) => validator.isURL(url),
      message: VALIDATION_MESSAGE('link', 'url'),
    },
  },
  image: {
    type: String,
    required: [true, REQUIRED_MESSAGE('image')],
    validate: {
      validator: (url) => validator.isURL(url),
      message: VALIDATION_MESSAGE('image', 'url'),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, REQUIRED_MESSAGE('owner')],
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
