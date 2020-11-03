import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
  },
  titleText: {
    marginLeft: '150px',
  },
  backHomeIcon: {},
  fab: {
    position: 'fixed',
    bottom: theme.spacing(8),
    right: theme.spacing(55),
    zIndex: '3000',
  },
  noTask: {
    padding: '250px 0',
  },
}));

export default useStyles;
