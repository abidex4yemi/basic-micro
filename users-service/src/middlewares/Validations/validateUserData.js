/* eslint-disable implicit-arrow-linebreak */
const Joi = require('@hapi/joi');
const joiValidate = require('../../util/validate');

/**
 * Users validation schema
 */
const userSchema = Joi.object().keys({
  name: Joi.string()
    .regex(/^[a-z][a-z\s]*$/i)
    .max(20)
    .trim()
    .required(),
});

/**
 * Validate user body against defined schema
 */
const validateSignupData = (req, res, next) =>
  joiValidate(req, res, next, userSchema);

module.exports = validateSignupData;
