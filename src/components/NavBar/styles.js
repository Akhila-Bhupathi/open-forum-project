import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root:{
    flexgrow:'1',
    display:'flex',
  },
  appBar: {
    borderRadius: 0,
    margin: '0 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 10px',
    marginBottom:'100',
    
  },
  heading: {
    color: 'rgba(255,255,255,1)',
    textDecoration: 'none',
  },
  
  toolbar: {
    display:'flex',
    width: '600px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width:'100px'
  },
  badges: {
    display: 'flex',
    justifyContent: 'space-between',
    width:'100px'
  },
  leaderboard: {
    display: 'flex',
    justifyContent: 'space-between',
    width:'150px'
  },
  my_posts: {
    display: 'flex',
    justifyContent: 'space-between',
    width:'110px'
  },

  profilephoto: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight:20,
  },
  logout:{
    display: 'flex',
    justifyContent: 'space-between',
    width:'100px',
    color:'blue',
    backgroundColor:'white',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'flex-end',
    position:'absolute',
    right:'0',
  },
  icon:{
    display: 'flex',
    justifyContent: 'space-between',
    width: '100px',
  },
  login:{
    display:'flex',
    fontSize:15,
    fontWeight:500,
    backgroundColor:'white',
    position:'absolute',
    right:100,
    top:10,
    width:'110px',

  }
  
}));