import React from 'react'
import {AppBar,Typography,Button,Toolbar,Avatar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import useStyles from "./styles.js";
import AddIcon from '@material-ui/icons/Add';
import {useState,useEffect} from 'react';

import {useHistory,useLocation} from 'react-router-dom';
import GL from '../GoogleLogin/GL';
import axios from 'axios';

const NavBar = () => {
    const classes=useStyles();
    
    const history=useHistory();
    const location=useLocation();
    
    
    const id=localStorage.getItem('id');
    const name=localStorage.getItem('name');
    const image=localStorage.getItem('imageUrl');
    
 /* useEffect(() => {
    const token=user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
    
  }, [location]);
*/

  const logout=()=>{
    localStorage.clear();
    axios.get('https://morning-temple-69567.herokuapp.com/auth/logout').then(response=>{
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
    history.push("/");
  };

  const badges=()=>{
    history.push("/badges");
  }
  const create=()=>{
    history.push("/create");
  }
    return (
      
        <AppBar className={classes.appBar} position="sticky"  >
          
        <Typography  component={Link} className={classes.heading} to="/" variant="h4" >
          Open Forum Website
        </Typography>
      
      <Toolbar className={classes.toolbar}>
        {id ? (
          <div className={classes.brandContainer}>
            <AddIcon onClick={create} className={classes.icon} style={{ cursor: 'pointer' }}/>
            <Typography  variant="h6" className={classes.badges} onClick={badges} style={{ cursor: 'pointer' }}>Badges</Typography>
            <Typography  variant="h6" className={classes.profile}>{name}</Typography>
            <Avatar alt="Cindy Baker" className={classes.profilephoto} src={image} />
            
            <Button variant="contained"  color="primary" className={classes.logout} onClick={logout}>Logout</Button>
          </div>
        ) : (
         <GL/>
        )}
      </Toolbar>
      </AppBar>
      
    )
}

export default NavBar
