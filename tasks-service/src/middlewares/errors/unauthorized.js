/**
 * Handle unauthorized error
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const unauthorized = (err, req, res, next) => {
  if (err.status !== 401) {
    return next(err);
  }

  return res.status(401).json({
    success: false,
    errors: {
      message: err.message || 'Unauthorized',
      status: err.status,
    },
  });
};

module.exports = unauthorized;
