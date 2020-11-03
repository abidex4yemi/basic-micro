import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardRoot: {
    boxShadow: 'none',
  },
  name: {
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    color: '#dc3545',
  },
  editIcon: {
    color: '#17a2b8',
  },
}));

export default useStyles;
