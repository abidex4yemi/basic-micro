/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
/**
 * Handle server error
 *
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const genericError = (err, req, res, next) =>
  res.status(500).json({
    success: false,
    errors: {
      message: err.message || 'Internal server error',
      status: err.status,
    },
  });

module.exports = genericError;
