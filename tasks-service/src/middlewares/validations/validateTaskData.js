/* eslint-disable implicit-arrow-linebreak */
const Joi = require('@hapi/joi');
const joiValidate = require('../../util/validate');

/**
 * Tasks validation schema
 */
const taskSchema = Joi.object().keys({
  description: Joi.string()
    .max(500)
    .trim()
    .required(),
  state: Joi.string()
    .valid('todo', 'done')
    .required(),
});

/**
 * Validate task body against defined schema
 */
const validateTaskData = (req, res, next) =>
  joiValidate(req, res, next, taskSchema);

module.exports = validateTaskData;
