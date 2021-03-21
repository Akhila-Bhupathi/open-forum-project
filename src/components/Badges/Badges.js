import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import ProgressBar from "./ProgressBar";
import "./style.css";

const Badges = () => {
  const [users, setUsers] = useState([]);
  //const user_id=localStorage.getItem('user_id');
  const email = localStorage.getItem("email");
  const [Points, setPoints] = useState();
  useEffect(() => {
    axios
      .get("https://morning-temple-69567.herokuapp.com/profile/lead")
      .then((response) => {
        setUsers(response.data);
        //  console.log(response);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const points = users.map((user) =>
    user.email == email ? user.Points : null
  );
  const [p1, setp1] = useState();
  const [p2, setp2] = useState();
  const [p3, setp3] = useState();
  const [p4, setp4] = useState();
  const p = points;
  const view = (p) => {
    const l = 100;
    if (p <= l) {
      setp1(p);
    }
    if (p > l && p <= 2 * l) {
      setp2(p - l);
      setp1(l);
    }
    if (p > 2 * l && p <= 3 * l) {
      setp1(l);
      setp2(2 * l);
      setp3(p - l);
    }
    if (p > 3 * l && p <= 4 * l) {
      setp1(l);
      setp2(2 * l);
      setp3(3 * l);
      setp4(p - l);
    }
  };

  return (
    <div>
      {users.map((user) =>
        user.email == email ? (
          <div key={user.email}>
            <Paper align="center">
              <Typography variant="h3" align="center">
                Hi {user.name}
              </Typography>
              <Typography variant="subtitle1" align="center">
                {user.email}
              </Typography>
              <br />
              <br />
              <Typography variant="h5" align="center">
                Total posts : {user.total_posts}
              </Typography>
              <Typography variant="h5" align="center">
                Total Comments : {user.total_comments}
              </Typography>
              <Typography variant="h5" align="center">
                Total Points : {user.Points}
              </Typography>
              <br />
              <br />
              <Button
                onClick={(e) => view(user.Points)}
                style={{ backgroundColor: "#3f51b5", color: "white" }}
              >
                View Progress
              </Button>
              <br />
              <br />
            </Paper>
          </div>
        ) : (
          <div></div>
        )
      )}
      <br />

      <Grid container spacing={3}>
        <Grid item xs={8}>
          <ProgressBar Points={p1} />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Level 1</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={8}>
          <ProgressBar Points={p2} />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Level 2</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={8}>
          <ProgressBar Points={p3} />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Level 3</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={8}>
          <ProgressBar Points={p4} />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Level 4</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Badges;
//
