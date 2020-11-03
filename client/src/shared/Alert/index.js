import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '0',
    left: '-1px',
    zIndex: '2000',
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function MessageAlert({ severity, message }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={severity}>{message}</Alert>
    </div>
  );
}
