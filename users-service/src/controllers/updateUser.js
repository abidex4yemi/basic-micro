const { User } = require('../models');
const { createError } = require('../util/error');

/**
 * @description Update user details
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const newUserDetails = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      newUserDetails,
      { new: true }
    ).lean();

    if (!updatedUser) {
      return next(
        createError({
          message: 'User does not exist',
          status: 404,
        })
      );
    }

    return res.status(201).json({
      success: true,
      message: 'User details updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    return next(
      createError({
        message: 'Could not update user details',
        status: 500,
      })
    );
  }
};

module.exports = updateUser;
