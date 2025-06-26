const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const urlCheck = (value, helpers) =>
  validator.isURL(value, { require_protocol: true })
    ? value
    : helpers.error('string.uri');

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(urlCheck),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24),
  }),
});

const validateItemBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    weather: Joi.string().valid('hot', 'warm', 'cold').required(),
    imageUrl: Joi.string().required().custom(urlCheck),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(urlCheck),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validateItemId,
  validateItemBody,
  validateUserUpdate,
};
