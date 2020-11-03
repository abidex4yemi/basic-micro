import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
  },
  closeIconContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  closeButton: {
    padding: '0 5px',
  },
}));

export default useStyles;
