import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Badge,
  Checkbox,
} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import { Delete as DeleteIcon, Create as EditIcon } from '@material-ui/icons';

import useStyles from './styles';
import { formatToShortDate } from '../../../../utils';

const Tasks = ({
  tasks,
  handleShowDeleteDialog,
  handleEdit,
  handleTaskStateChange,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        {tasks.map(({ description, _id, state, createdAt }) => (
          <Grid item xs={12} key={_id}>
            <Card className={classes.cardRoot}>
              <CardContent>
                <Typography
                  variant="caption"
                  display="block"
                  className={classes.date}
                >
                  {formatToShortDate(createdAt)}
                </Typography>
              </CardContent>

              <CardContent className={classes.cardContentRoot}>
                <Typography
                  gutterBottom
                  variant="body2"
                  className={classes.description}
                >
                  {description}
                </Typography>
              </CardContent>

              <CardActions className={classes.actions}>
                <div>
                  <IconButton
                    aria-label="edit"
                    className={classes.editIcon}
                    onClick={() => handleEdit(_id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className={classes.deleteIcon}
                    onClick={() => handleShowDeleteDialog(_id)}
                  >
                    <DeleteIcon />
                  </IconButton>

                  <Checkbox
                    checked={state === 'done'}
                    onChange={() => {
                      handleTaskStateChange({
                        taskId: _id,
                        state: state === 'todo' ? 'done' : 'todo',
                      });
                    }}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </div>
                <div className={classes.todoStateContainer}>
                  <Badge
                    color={state === 'todo' ? 'error' : 'primary'}
                    badgeContent={state.toUpperCase()}
                  />
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Tasks;
