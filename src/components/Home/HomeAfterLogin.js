import React from 'react';
import {
    Container,
    Grow,
    Grid,
  } from "@material-ui/core";
import Posts from ".././Posts/Posts";
import useStyles from "./styles.js";

import {useEffect,useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CompletePost from '.././CompletePost/CompletePost';
import {useHistory} from 'react-router-dom';
import uparrow from '../.././images/up-arrow.png';
import notupvote from '../.././images/not-vote.png';

import axios from 'axios';
import LeaderBoard from '../LeaderBoard/LeaderBoard';

const Home = () => {
  
  const history=useHistory();
  const user=localStorage.getItem('user_id');
  const [user1,setUser]=useState();
  const [posts,setposts]=useState([]);
  const [post_to_be_updated,setPostToBe]=useState();
  const [newvote,setNewVote]=useState();
  
  const [data,setData]=useState({user_id:'',post_id:''});
  var votes;
  var post_to;
  const getPosts=()=>{
    axios.get(`https://morning-temple-69567.herokuapp.com/posts/log/${user}`).then(response=>setposts(response.data)).catch((error) => {
   //   console.log(error);
    });  
  }

  const callApi=()=>{
  //  console.log('e');
   // console.log(data);
   axios
      .post(
        "https://morning-temple-69567.herokuapp.com/votes/posts",data
      )
      .then((response) => {
        
   //     console.log(response);
        const votes=response.data.votes;
        setNewVote(votes);
       // getPosts();
      })
      .catch((error) => {
     //   console.log(error);
      });  
  }

  const vote=(post_id)=>{
    //console.log("Voted");
  //console.log(post_id);
  
  //setPostToBe(post_id);
  //setData({...data,post_id:post_id});
  var data={
    "user_id":parseInt(localStorage.getItem('user_id')),
    "post_id":post_id
  }
 // console.log(data);
 // console.log(JSON.stringify(data));
 // setData({...data,post_id:post_id});
 // console.log(data);
 // callApi();
 // const data={"user_id":user,"post_id":post_id};
 axios.post('https://morning-temple-69567.herokuapp.com/votes/posts', JSON.stringify(data), {
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
        }
})
.then((response) => {
 //console.log(response.data); 
 getPosts();    //http://localhost:5000
//localStorage.setItem("user_id",response.data.user_id);
//history.push('/');

votes=response.data;
})
.catch((error) => {
// console.log(error);
}) 


  /*    axios.post("https://morning-temple-69567.herokuapp.com/votes/posts", data, {
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
        }
})
.then((response) => {
 console.log(response.data);     //http://localhost:5000
//localStorage.setItem("user_id",response.data.user_id);
history.push('/');
})
.catch((error) => {
 console.log(error);
})  */
  }

 /* React.useEffect(()=>{
    console.log(data);
   axios
      .post(
        "https://morning-temple-69567.herokuapp.com/votes/posts",data
      )
      .then((response) => {
        
        console.log(response);
       // getPosts();
      })
      .catch((error) => {
        console.log(error);
      });   
  },[data])*/


  const send=(id)=>{
    history.push(`/completepost/${id}`);
  }

  useEffect(() => {
    getPosts();
    setUser(localStorage.getItem('user_id'));
    setData({...data,user_id:parseInt(user1)})
    
  }, []);
  
    const classes = useStyles();
    return (
      
        <Grow in>
            <Container fixed>
          <Grid container  className={classes.gridc}>
          <Grid item xs={6} className={classes.posts}>
          <Container className={classes.cont}>
          {posts.map((post)=>(
            <div key={post.post_id}  className={classes.divc}>
             <Card className={classes.card}>
        
             <CardActionArea>
                 {post.image && <CardMedia
                
                component="img"
                
                height="400"
                image={`https://morning-temple-69567.herokuapp.com/images/uploads/${post.image}`}
                title={post.title}
              />}
               
               <CardContent>
                 <Typography gutterBottom variant="h5" component="h2">
                   {post.title}
                 </Typography>
                 <Typography variant="body2" color="textSecondary" component="p">
                   {post.overview}
                 </Typography>
               </CardContent>
             </CardActionArea>
             <CardActions>
               

               {(post.voted==0)?(
                    <Button disabled={!user} onClick={(e)=>{
                        vote(post.post_id);
                        }}><img className={classes.voteicon} src={notupvote} /> </Button> ):(
                            <Button disabled={!user} 
                                ><img className={classes.voteicon} src={uparrow} /> </Button>

                        

               )}
               
               <Typography variant="h6">
                 
               
                <div>{post.votes}</div>                 
                 
                 
                 
                 </Typography>  
               <Button size="small" disabled={!user} color="primary" onClick={()=>send(post.post_id)}>
                  More
               </Button>
             </CardActions>
           </Card>
           </div>

          ))}

          </Container>
          
        </Grid>
        <Grid item xs={6} className={classes.leader}>
          <LeaderBoard/>
        </Grid>
          </Grid>
          </Container>
            
          
            
        </Grow>
      
    );
}

export default Home



// {(post_to_be_updated==post.post_id)  ? 