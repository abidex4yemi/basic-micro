const express = require('express');
const userController = require('../controllers');
const validateUserData = require('../middlewares/Validations/validateUserData');

const userRouter = express.Router();

userRouter
  .route('/')
  .post(validateUserData, userController.addUser)
  .get(userController.getAllUser);

userRouter
  .route('/:id')
  .patch(validateUserData, userController.updateUser)
  .delete(userController.deleteUser)
  .get(userController.getUserById);

module.exports = userRouter;
