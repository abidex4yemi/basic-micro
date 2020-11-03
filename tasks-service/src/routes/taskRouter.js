const express = require('express');
const taskController = require('../controllers');
const validateTaskData = require('../middlewares/validations/validateTaskData');

const taskRouter = express.Router();

taskRouter
  .route('/user/:userId')
  .post(validateTaskData, taskController.addTask)
  .get(taskController.getUserTasks);

taskRouter.route('/delete-all/user/:userId').delete(taskController.deleteAll);

taskRouter
  .route('/:taskId/user/:userId')
  .delete(taskController.deleteTask)
  .patch(validateTaskData, taskController.updateTask);

module.exports = taskRouter;
