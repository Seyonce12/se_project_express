const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const urlCheck = (value, helpers) =>
  validator.isURL(value, { require_protocol: true }) ? value : helpers.error('string.uri');


module.exports = {
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

validateItemId: celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hex().length(24),
    }),
  }),

  validateItemBody: celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      weather: Joi.string().valid('hot', 'warm', 'cold').required(),
      imageUrl: Joi.string().required().custom(urlCheck),
    }),
  }),

  validateUserUpdate: celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required().custom(urlCheck),
    }),
  }),
};