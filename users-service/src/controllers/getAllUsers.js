const { User } = require('../models');
const { createError } = require('../util/error');

/**
 * @description Get users
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

const getAllUser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const resultPerPage = 8;

    // Get user on demand | limiting the user to 8 per page
    const users = await User.find()
      .skip(resultPerPage * page - resultPerPage)
      .limit(resultPerPage);

    const totalNumberOfUser = await User.countDocuments();

    const totalPages = Math.ceil(totalNumberOfUser / resultPerPage);

    return res.status(200).json({
      success: true,
      users,
      currentPage: page,
      totalPages,
      numOfResults: users.length,
      totalUsers: totalNumberOfUser,
    });
  } catch (error) {
    return next(
      createError({
        status: 500,
        message: 'Try again something went wrong',
      })
    );
  }
};

module.exports = getAllUser;
