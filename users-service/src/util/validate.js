/**
 * Validate request body
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @param {object} schema
 */
const joiValidate = (req, res, next, schema) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((current) => ({
      field: current.context.key,
      message: current.message.replace(/['"]/g, ''),
    }));

    return res.status(400).json({
      errors,
    });
  }

  req.body = value;

  return next();
};

module.exports = joiValidate;
