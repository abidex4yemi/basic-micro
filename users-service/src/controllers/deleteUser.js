const axios = require('axios');
const { User } = require('../models');
const { createError } = require('../util/error');
const { BASE_TASK_API_URL } = require('../constants');

/**
 * @description Delete a user given id provided is valid
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // await axios.delete(`${BASE_TASK_API_URL}/tasks/delete-all/user/${userId}`);
    const userExist = await User.findOneAndDelete({ _id: userId });

    if (!userExist) {
      return next(
        createError({
          message: 'User does not exist',
          status: 404,
        })
      );
    }

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (err) {
    return next(
      createError({
        message: 'Could not delete user',
        status: 500,
      })
    );
  }
};

module.exports = deleteUser;
