/* eslint-disable no-underscore-dangle */
const axios = require('axios');
const { Task } = require('../models');
const { createError } = require('../util/error');
const { BASE_USER_API_URL } = require('../constants');

/**
 * @description Create new task
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const addTask = async (req, res, next) => {
  try {
    const taskDetails = req.body;
    const { userId } = req.params;

    // const {
    //   data: { user },
    // } = await MyApiClient.get(`/users/${userId}`);

    const task = await Task.create({
      ...taskDetails,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: 'New task created',
      task,
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

module.exports = addTask;
