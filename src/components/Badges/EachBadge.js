import React,{useState,useEffect} from 'react';
import {Paper,Typography,Grid} from '@material-ui/core';
import ProgressBar from './ProgressBar';

const EachBadge = ({Points}) => {
    var p=20;

    const [p1,setp1]=useState();
    const [p2,setp2]=useState();
    const [p3,setp3]=useState();
    const [p4,setp4]=useState();
    if(p<=400 && p>300){
        p=p-300;
        setp4(p);
        
    }
    if(p<=300 && p>200){
        p=p-200;
        setp3(p);
    }
    if(p<=200 && p>100){
        p=p-100;
        setp2(p);
    }
    if(p<=100){
        setp1(p);
    }


    return (
        <div>
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

    <Grid container spacing={3}>
        <Grid item xs={6}>
          <ProgressBar Points={p3}/>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Level 3</Typography>
        </Grid>
    </Grid>

    <Grid container spacing={3}>
        <Grid item xs={6}>
          <ProgressBar Points={p4}/>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Level 4</Typography>
        </Grid>
    </Grid>

        </div>
    )
}

export default EachBadge
