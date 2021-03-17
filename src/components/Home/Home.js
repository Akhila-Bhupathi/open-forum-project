import React from 'react';
import {
    Container,
    Grow,
    Grid,
  } from "@material-ui/core";
import Posts from ".././Posts/Posts";
import useStyles from "./styles.js";

import {useEffect,useState} from 'react';

import axios from 'axios';
import LeaderBoard from '../LeaderBoard/LeaderBoard';

const Home = () => {
  

  const [posts,setposts]=useState([]);
  useEffect(() => {
    axios.get('https://morning-temple-69567.herokuapp.com/posts').then(response=>setposts(response.data)).catch((error) => {
      console.log(error);
    });
    
  }, []);
  
    const classes = useStyles();
    return (
      
        <Grow in>
            <Container fixed>
          <Grid container  className={classes.gridc}>
          <Grid item xs={6} className={classes.posts}>
          <Posts posts={posts} />
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
