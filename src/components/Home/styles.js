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
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    
    
  },
  con:{
    margin:'100',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '50%',
    position: 'relative',
    maxWidth: 400,
    margin: "0 auto",
    marginTop:"100",
    
  },
  divc:{
    marginTop:30,
  },
  
  cont:{
    marginTop:30,
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  voteicon:{
    width:50,
    height:50
  }
}));