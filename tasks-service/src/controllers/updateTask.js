const { Task } = require('../models');
const { createError } = require('../util/error');

/**
 * @description Update task details
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const updateTask = async (req, res, next) => {
  try {
    const { taskId, userId } = req.params;

    const newTaskDetails = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      newTaskDetails,
      { new: true }
    ).lean();

    if (!updatedTask) {
      return next(
        createError({
          message: 'Task or user (ID) does not exist',
          status: 404,
        })
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Task details updated successfully',
      user: updatedTask,
    });
  } catch (err) {
    return next(
      createError({
        message:
          'Could not update task details - please check you provided a valid ID',
        status: 500,
      })
    );
  }
};

module.exports = updateTask;
