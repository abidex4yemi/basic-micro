import React from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import { Delete as DeleteIcon, Create as EditIcon } from '@material-ui/icons';

import useStyles from './styles';

const Users = ({ users, handleShowDeleteDialog, handleEdit }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        {users.map(({ name, _id }) => (
          <Grid item xs={12} sm={12} md={4} key={_id}>
            <Card className={classes.cardRoot}>
              <CardActionArea component="a" href={`/tasks/user/${_id}`}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="overline"
                    display="block"
                    className={classes.name}
                  >
                    {name}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions className={classes.actions}>
                <IconButton
                  aria-label="edit-icon"
                  className={classes.editIcon}
                  onClick={() => handleEdit(_id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete-icon"
                  className={classes.deleteIcon}
                  onClick={() => handleShowDeleteDialog(_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Users;
