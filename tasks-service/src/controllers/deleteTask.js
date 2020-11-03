const { Task } = require('../models');
const { createError } = require('../util/error');

/**
 * @description Delete user task record
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const deleteTask = async (req, res, next) => {
  try {
    const { taskId, userId } = req.params;

    const taskAndUserExist = await Task.findOneAndDelete({
      _id: taskId,
      userId,
    });

    if (!taskAndUserExist) {
      return next(
        createError({
          message: 'Task or user (ID) does not exist',
          status: 404,
        })
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (err) {
    return next(
      createError({
        message: 'Could not delete task - please check you provided a valid ID',
        status: 500,
      })
    );
  }
};

module.exports = deleteTask;
