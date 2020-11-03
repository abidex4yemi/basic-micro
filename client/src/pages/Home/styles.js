import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
  },
  pageTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(5),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(8),
    right: theme.spacing(55),
    zIndex: '3000',
  },
  noUser: {
    padding: '250px 0',
  },
}));

export default useStyles;
