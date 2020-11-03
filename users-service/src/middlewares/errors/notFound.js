/**
 * Handle resource not found error
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const notFound = (err, req, res, next) => {
  if (err.status !== 404) {
    return next(err);
  }

  return res.status(404).json({
    success: false,
    errors: {
      message: err.message || 'Resource not found',
      status: err.status,
    },
  });
};

module.exports = notFound;
