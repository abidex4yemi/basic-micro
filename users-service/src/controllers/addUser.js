const { User } = require('../models');
const { createError } = require('../util/error');

/**
 * @description Create new User
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const addUser = async (req, res, next) => {
  try {
    const userDetails = req.body;

    const user = await User.create(userDetails);

    return res.status(201).json({
      success: true,
      message: 'New user created',
      user,
    });
  } catch (err) {
    if (err.message.includes('duplicate key error collection')) {
      return next(
        createError({
          message: 'User with the provided name already exist',
          status: 409,
        })
      );
    }

    return next(
      createError({
        message: 'Could not create new user',
        status: 500,
      })
    );
  }
};

module.exports = addUser;
