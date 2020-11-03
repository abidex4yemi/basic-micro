import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_USER_API_URL } from '../../../../constants';
import { TextField, Button } from '@material-ui/core';
import Modal from '../../../../shared/Modal';
import MessageAlert from '../../../../shared/Alert';

import useStyles from './style';

export default function UserForm({
  showModal,
  handleCloseModal,
  setUsers,
  formType,
  currentUserId,
  users,
  title,
}) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (formType === 'edit-user') {
      const user = users.find(
        (currentUser) => `${currentUser._id}` === `${currentUserId}`
      );
      setName(user.name);
    }

    return () => {};
  }, [currentUserId, formType, users]);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError('Name is required');
      return;
    }

    if (formType === 'add-user') {
      try {
        const res = await axios.post(`${BASE_USER_API_URL}/users`, { name });

        setUsers((prevState) => [...prevState, res.data.user]);
        setName('');
        handleCloseModal();
        setError('');
      } catch (error) {
        setError(
          error.response.data.errors.message ||
            error.response.data.errors[0].message
        );
      }
    }

    if (formType === 'edit-user') {
      try {
        const res = await axios.patch(
          `${BASE_USER_API_URL}/users/${currentUserId}`,
          { name }
        );

        const updatedUsers = users.map((user) => {
          if (user._id === currentUserId) {
            return res.data.user;
          }

          return user;
        });

        setUsers(updatedUsers);
        setName('');
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
              label="Enter name"
              id="outlined-size-small"
              variant="outlined"
              size="small"
              margin="normal"
              value={name}
              name="name"
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
