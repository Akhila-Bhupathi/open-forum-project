import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  [theme.breakpoints.down('lg')]: {
    mainContainer: {
      flexDirection: 'column-reverse',
    },
  },
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(255,255,255,1)',
  },
  leader:{
    position:'sticky',
  }
}));