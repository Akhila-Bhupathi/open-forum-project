
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(6),
    },
  },
  div:{
    margin:'0 auto',
    marginTop:50,
  },
  paper: {
    padding: theme.spacing(1),
    width:'40%',
    height:'60%',
    textAlign:'center',
    margin:'0 auto',
    
    
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileIn: {
    width: '97%',
    margin: '10px 0',
    padding: theme.spacing(2),
    
  },
  textarea:{
    width:'100%',
    marginTop:50,
    marginLeft:30,
    marginRight:30,
    border:'1 solid black',
  },
  buttonSubmit: {
    marginBottom: 50,
    borderRadius:'20',
    width:'50%',
  },
  container:{
    textAlign:'center',
    marginTop:'200',
  },
  text:{
    width:'100%',
    marginTop:50,
    marginLeft:30,
    marginRight:30,
    textAlign:'center',
  }
}));
