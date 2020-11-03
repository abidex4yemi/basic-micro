const axios = require('axios');
const { Task } = require('../models');
const { createError } = require('../util/error');
const { BASE_USER_API_URL } = require('../constants');

/**
 * @description Get user task
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

const getUserTasks = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // await axios.get(`${BASE_USER_API_URL}/users/${userId}`);

    const tasks = await Task.find({ userId });

    if (!tasks.length) {
      return res.status(200).json({
        success: true,
        message: 'Hurray you no tasks',
        totalNumberOfTasks: 0,
        tasks,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'All user tasks',
      totalNumberOfTask: tasks.length,
      tasks,
    });
  } catch (err) {
    return next(
      createError({
        message: 'No user with the provided id',
        status: 404,
      })
    );
  }
};

module.exports = getUserTasks;
