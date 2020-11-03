const badRequest = (err, req, res, next) => {
  if (err.status !== 400) {
    return next(err);
  }

  // Handle invalid JSON body
  if (err.type && err.type.includes('entity.parse.failed')) {
    return res.status(400).json({
      success: false,
      errors: [
        {
          message: 'Invalid JSON object check request body',
          body: err.body,
        },
      ],
    });
  }

  return res.status(400).json({
    success: false,
    errors: {
      message: err.message || 'Bad Request',
      status: err.status,
    },
  });
};

module.exports = badRequest;
