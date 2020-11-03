import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(10),
    backgroundColor: '#E4F0FE',
    minHeight: '100vh',
    position: 'relative',
  },
}));

export default useStyles;
