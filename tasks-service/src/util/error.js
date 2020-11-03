/**
 * Create new error
 *
 * @param {String} message
 * @param {number} status
 *
 * @returns {object} error
 */
const createError = ({ message = 'Internal server error', status = 500 }) => {
  const error = new Error(message);
  error.status = status;
  error.success = false;
  return error;
};

module.exports = {
  createError,
};
