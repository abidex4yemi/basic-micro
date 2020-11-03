/**
 * Handle bad request error
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @param {object} err
 */

const forbidden = (err, req, res, next) => {
  if (err.status !== 403) {
    return next(err);
  }

  return res.status(403).json({
    success: false,
    errors: {
      message: err.message || 'Forbidden',
      status: err.status,
    },
  });
};

module.exports = forbidden;
