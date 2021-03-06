/**
 * Handle resource resource already exist error
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const resourceConflict = (err, req, res, next) => {
  if (err.status !== 409) {
    return next(err);
  }

  return res.status(409).json({
    success: false,
    errors: {
      message: err.message,
      status: err.status,
    },
  });
};

module.exports = resourceConflict;
