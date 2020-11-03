const { User } = require('../models');
const { createError } = require('../util/error');

/**
 * Get single user
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Cannot find user with ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User record found',
      user,
    });
  } catch (err) {
    return next(
      createError({
        message: 'Try again something went wrong',
        status: 500,
      })
    );
  }
};

module.exports = getUserById;
