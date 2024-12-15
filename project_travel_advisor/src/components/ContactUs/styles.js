import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    padding: theme.spacing(4),
    margin: 'auto',
    maxWidth: '600px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));
