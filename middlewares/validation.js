const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const urlCheck = (value, helpers) =>
  validator.isURL(value, { require_protocol: true }) ? value : helpers.error('string.uri');

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(urlCheck),
  }),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
