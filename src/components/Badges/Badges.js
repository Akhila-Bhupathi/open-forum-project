import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Paper,Typography,Grid} from '@material-ui/core';
import ProgressBar from './ProgressBar';
import EachBadge from './EachBadge';

const Badges = () => {
    const [users,setUsers]=useState([]);
    //const user_id=localStorage.getItem('user_id');
    const email=localStorage.getItem('email');
    const [Points,setPoints]=useState();
    useEffect(()=>{
        axios.get("https://morning-temple-69567.herokuapp.com/profile/lead").then(response=>{
            setUsers(response.data);
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
    },[]);

    const points=users.map((user)=>(user.email==email?
        user.Points:null))

    const p=points;
    var p1=0,p2=0,p3=0,p4=0;
    if(p<=400 && p>300){
        p4=p-300;
    }
    else if(p<=300 && p>200){
        p3=p-200;
    }
    else if(p<=200 && p>100){
        p2=p-100;
    }
    if(p<100)
    {
        p1=p;
    }
    //const p1=50;
   // const [Points,setPoints]=useState();
    
    return (
        <div>
          {users.map((user)=>(user.email==email ?
          <div>
              <Paper elevation={1}>
                <Typography variant="h3" align="center" >
                    Hi {user.name}
                </Typography>
                <Typography variant="subtitle1" align="center" >
                     {user.email}
                </Typography>
                <br/>
                <br/>
                <Typography variant="h5" align="center" >
                    Total posts : {user.total_posts}
                </Typography>
                <Typography variant="h5" align="center" >
                    Total Comments : {user.total_comments}
                </Typography>
                <br/>
                <br/>
                
                
                </Paper></div>:<div></div>
          ))}

<Grid container spacing={3}>
        <Grid item xs={6}>
          <ProgressBar Points={p1}/>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Level 1</Typography>
        </Grid>
    </Grid>

    <Grid container spacing={3}>
        <Grid item xs={6}>
          <ProgressBar Points={p2}/>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Level 2</Typography>
        </Grid>
    </Grid>

                
              
              
          
          
          
        </div>
    )
}

export default Badges
//