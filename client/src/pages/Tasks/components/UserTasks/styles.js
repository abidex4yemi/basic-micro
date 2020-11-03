import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardContentRoot: {
    padding: '10px 20px',
  },
  cardRoot: {
    boxShadow: 'none',
  },
  description: {
    textAlign: 'justify',
    lineHeight: '1.8',
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
  todoStateContainer: {
    paddingRight: '30px',
  },
  date: {
    textAlign: 'right',
  },
}));

export default useStyles;
