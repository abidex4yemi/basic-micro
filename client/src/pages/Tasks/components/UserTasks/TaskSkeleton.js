import React from 'react';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import useStyles from './styles';

const UserSkeleton = ({ count }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        {Array.apply(null, { length: count }).map((_, index) => (
          <Grid item xs={12} key={index}>
            <Skeleton variant="rect" width={152} height={67} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserSkeleton;
