const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateObjId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'string.required': 'Поле "keyword" должно быть заполнено',
      }),
    title: Joi.string().required()
      .messages({
        'string.required': 'Поле "title" должно быть заполнено',
      }),
    text: Joi.string().required()
      .messages({
        'string.required': 'Поле "title" должно быть заполнено',
      }),
    date: Joi.string().required()
      .messages({
        'string.required': 'Поле "date" должно быть заполнено',
      }),
    source: Joi.string().required()
      .messages({
        'string.required': 'Поле "source" должно быть заполнено',
      }),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "link" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "link" должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "image" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "image" должно быть заполнено',
      }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2 символа',
        'string.max': 'Максимальная длина поля "name" - 30 символов',
        'string.required': 'Поле "name" должно быть заполнено',
      }),
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': 'Минимальная длина поля "password" - 8 символов',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': 'Минимальная длина поля "password" - 8 символов',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

module.exports = {
  validateObjId,
  validateArticleBody,
  validateUserBody,
  validateAuthentication,
};
