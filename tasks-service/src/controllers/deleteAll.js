const { Task } = require('../models');
const { createError } = require('../util/error');

/**
 * @description Delete user task record
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const deleteAll = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const taskAndUserExist = await Task.deleteMany({
      userId,
    });

    if (!taskAndUserExist) {
      return next(
        createError({
          message: 'User (ID) does not exist',
          status: 404,
        })
      );
    }

    return res.status(200).json({
      success: true,
      message: `All task with user id (${userId}) deleted successfully`,
    });
  } catch (err) {
    return next(
      createError({
        message:
          'Could not delete task - please check you provided a valid user ID',
        status: 500,
      })
    );
  }
};

module.exports = deleteAll;
