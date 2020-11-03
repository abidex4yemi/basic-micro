import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Fab, Box, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import useStyles from './style';
import { BASE_TASK_API_URL } from '../../constants';

import UserTasks from './components/UserTasks';
import TaskSkeleton from './components/UserTasks/TaskSkeleton';
import TaskForm from './components/TaskForm';
import EditTaskForm from './components/TaskForm';
import AlertDialog from '../../shared/Dialog';

const Tasks = (props) => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userId, setUserId] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState('');

  const handleTaskStateChange = ({ taskId, state }) => {
    const { description } = tasks.find((task) => `${task._id}` === `${taskId}`);

    axios
      .patch(`${BASE_TASK_API_URL}/tasks/${taskId}/user/${userId}`, {
        description,
        state,
      })
      .then(() => {
        setTasks((prevState) =>
          prevState.map((task) => {
            if (task._id === taskId) {
              return {
                ...task,
                state,
              };
            }

            return task;
          })
        );
      });
  };

  const handleShowTaskModal = () => {
    setShowAddTaskModal((prevState) => !prevState);
  };

  const handleCloseAddTaskModal = () => {
    setShowAddTaskModal(false);
  };

  const handleCloseEditTaskModal = () => {
    setShowEditTaskModal(false);
  };

  const fetchTasksByUserId = async (id) => {
    await axios.get(`${BASE_TASK_API_URL}/tasks/user/${id}`).then((res) => {
      setTasks(() => res.data.tasks);
    });
  };

  const handleShowDeleteDialog = (taskId) => {
    setShowDeleteDialog(true);
    setCurrentTaskId(taskId);
  };

  const handleDelete = async ({ userId, taskId }) => {
    await axios
      .delete(`${BASE_TASK_API_URL}/tasks/${taskId}/user/${userId}`)
      .then(() => {
        setTasks((prevState) =>
          prevState.filter((task) => `${task._id}` !== `${taskId}`)
        );
      });
  };

  const handleCloseDeleteDialog = ({ answer }) => {
    if (answer === 'yes') {
      handleDelete({ userId, taskId: currentTaskId });
    }

    setShowDeleteDialog(false);
  };

  const handleEdit = (id) => {
    setCurrentTaskId(id);
    setShowEditTaskModal((prevState) => !prevState);
  };

  useEffect(() => {
    const userId = props.history.location.pathname.split('/')[3];
    setUserId(userId);
    fetchTasksByUserId(userId);
  }, [props.history.location.pathname]);

  return (
    <>
      <header className={classes.headerContent}>
        <IconButton
          aria-label="back-home"
          className={classes.backHomeIcon}
          component="a"
          href="/"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          gutterBottom
          variant="h5"
          display="block"
          className={classes.titleText}
        >
          All tasks
        </Typography>
      </header>
      <main>
        {tasks !== undefined ? (
          <UserTasks
            tasks={tasks}
            handleShowDeleteDialog={handleShowDeleteDialog}
            handleTaskStateChange={handleTaskStateChange}
            handleEdit={handleEdit}
          />
        ) : (
          <TaskSkeleton count={6} />
        )}

        {!tasks.length && (
          <Box className={classes.noTask}>
            <Typography variant="h5" align="center">
              No task 💪
            </Typography>
          </Box>
        )}

        <Fab
          aria-label="Add"
          className={classes.fab}
          color="primary"
          onClick={handleShowTaskModal}
        >
          <AddIcon />
        </Fab>

        {showAddTaskModal && (
          <TaskForm
            showModal={showAddTaskModal}
            handleCloseModal={handleCloseAddTaskModal}
            setTasks={setTasks}
            userId={userId}
            currentTaskId={currentTaskId}
            formType="add-task"
            title="Add task"
          />
        )}

        {showEditTaskModal && (
          <EditTaskForm
            showModal={showEditTaskModal}
            handleCloseModal={handleCloseEditTaskModal}
            setTasks={setTasks}
            formType="edit-task"
            title="Edit task"
            userId={userId}
            currentTaskId={currentTaskId}
            tasks={tasks}
          />
        )}

        {showDeleteDialog && (
          <AlertDialog
            showDialog={showDeleteDialog}
            handleClose={handleCloseDeleteDialog}
            title={'Are you sure ?'}
          />
        )}
      </main>
    </>
  );
};

export default Tasks;
