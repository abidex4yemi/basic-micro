import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_TASK_API_URL } from '../../../../constants';
import { TextField, Button } from '@material-ui/core';
import Modal from '../../../../shared/Modal';
import MessageAlert from '../../../../shared/Alert';

import useStyles from './style';

export default function TaskForm({
  showModal,
  handleCloseModal,
  setTasks,
  formType,
  currentTaskId,
  tasks,
  title,
  userId,
}) {
  const classes = useStyles();
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [taskState, setTaskState] = useState('todo');

  useEffect(() => {
    if (formType === 'edit-task') {
      const task = tasks.find(
        (currentTask) => `${currentTask._id}` === `${currentTaskId}`
      );
      setDescription(task.description);
      setTaskState(task.state);
    }

    return () => {};
  }, [currentTaskId, formType, tasks]);

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description.trim() === '') {
      setError('Description is required');
      return;
    }

    if (formType === 'add-task') {
      try {
        const res = await axios.post(
          `${BASE_TASK_API_URL}/tasks/user/${userId}`,
          {
            description,
            state: taskState,
          }
        );

        setTasks((prevState) => [...prevState, res.data.task]);
        setDescription('');
        handleCloseModal();
        setError('');
      } catch (error) {
        setError(
          error.response.data.errors.message ||
            error.response.data.errors[0].message
        );
      }
    }

    if (formType === 'edit-task') {
      try {
        const res = await axios.patch(
          `${BASE_TASK_API_URL}/tasks/${currentTaskId}/user/${userId}`,
          { description, state: taskState }
        );

        const updatedTasks = tasks.map((task) => {
          if (task._id === currentTaskId) {
            return res.data.user;
          }

          return task;
        });

        setTasks(updatedTasks);
        setDescription('');
        handleCloseModal();
        setError('');
      } catch (error) {
        setError(
          error.response.data.errors.message ||
            error.response.data.errors[0].message
        );
      }
    }
  };

  return (
    <>
      <Modal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        title={title}
      >
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <TextField
              label="Enter task description"
              id="outlined-size-small"
              variant="outlined"
              size="small"
              margin="normal"
              value={description}
              name="description"
              onChange={handleInputChange}
              autoFocus
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
      {error && <MessageAlert message={error} severity="error" />}
    </>
  );
}
