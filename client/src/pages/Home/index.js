import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Fab, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './styles';
import { BASE_USER_API_URL } from '../../constants';

import Users from './components/Users';
import UserSkeleton from './components/Users/UserSkeleton';
import AddUserForm from './components/UserForm';
import EditUserForm from './components/UserForm';
import AlertDialog from '../../shared/Dialog';

const Home = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');

  const handleShowUserModal = () => {
    setShowAddUserModal((prevState) => !prevState);
  };

  const handleCloseAddUserModal = () => {
    setShowAddUserModal(false);
  };

  const handleCloseEditUserModal = () => {
    setShowEditUserModal(false);
  };

  const fetchUsers = async () => {
    await axios.get(`${BASE_USER_API_URL}/users`).then((res) => {
      setUsers(() => res.data.users);
    });
  };

  const handleShowDeleteDialog = (id) => {
    setShowDeleteDialog(true);
    setCurrentUserId(id);
  };

  const handleDelete = async (userId) => {
    await axios.delete(`${BASE_USER_API_URL}/users/${userId}`).then((res) => {
      setUsers((prevState) => prevState.filter((user) => user._id !== userId));
    });
  };

  const handleCloseDeleteDialog = ({ answer }) => {
    if (answer === 'yes') {
      handleDelete(currentUserId);
    }

    setShowDeleteDialog(false);
  };

  const handleEdit = (id) => {
    setCurrentUserId(id);
    setShowEditUserModal((prevState) => !prevState);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <header className={classes.pageTitle}>
        <Typography gutterBottom variant="h5" display="block">
          All users
        </Typography>
      </header>
      <main>
        {users !== undefined ? (
          <Users
            users={users}
            handleShowDeleteDialog={handleShowDeleteDialog}
            handleEdit={handleEdit}
          />
        ) : (
          <UserSkeleton count={6} />
        )}

        {!users.length && (
          <Box className={classes.noUser}>
            <Typography variant="h5" align="center">
              No users
            </Typography>
          </Box>
        )}

        <Fab
          aria-label="Add"
          className={classes.fab}
          color="primary"
          onClick={handleShowUserModal}
        >
          <AddIcon />
        </Fab>

        {showAddUserModal && (
          <AddUserForm
            showModal={showAddUserModal}
            handleCloseModal={handleCloseAddUserModal}
            setUsers={setUsers}
            formType="add-user"
            title="Add user"
          />
        )}

        {showEditUserModal && (
          <EditUserForm
            showModal={showEditUserModal}
            handleCloseModal={handleCloseEditUserModal}
            setUsers={setUsers}
            formType="edit-user"
            title="Edit user"
            currentUserId={currentUserId}
            users={users}
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

export default Home;
