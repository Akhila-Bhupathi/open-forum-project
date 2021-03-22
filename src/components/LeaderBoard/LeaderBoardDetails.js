import React, { useState, useEffect } from "react";

import useStyles from "./styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import bronze from "../.././images/bronze.PNG";
import silver from "../.././images/silver.PNG";
import gold from "../.././images/gold.PNG";
import platinum from "../.././images/platinum.PNG";

function LeaderBoard() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://morning-temple-69567.herokuapp.com/profile/lead")
      .then((response) => {
        setUsers(response.data);
        // console.log(response);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const setBadge = (points) => {
    const l = 100;
    if (points < l) {
      return bronze;
    } else if (points < 2 * l) {
      return silver;
    } else if (points < 3 * l) {
      return gold;
    } else if (points <= 4 * l) {
      return platinum;
    }
  };

  return (
    <Card className={classes.root} elevation={5}>
      <CardContent>
        <Grid container>
          <Grid item md={2} lg={2}>
            <Typography variant="h4" component="div">
              Name
            </Typography>
          </Grid>
          <Grid item md={3} lg={3}>
            <Typography variant="h4" component="div">
              <span>mail </span>
            </Typography>
          </Grid>
          <Grid item md={2} lg={2}>
            <Typography variant="h4" component="div">
              Points
            </Typography>
          </Grid>
          <Grid item md={1} lg={1}>
            <Typography variant="h4" component="div">
              Posts
            </Typography>
          </Grid>
          <Grid item md={3} lg={3}>
            <Typography variant="h4" component="div">
              Comments
            </Typography>
          </Grid>
          <Grid item md={1} lg={1}>
            <Typography variant="h4" component="div">
              Badge
            </Typography>
          </Grid>
          <br />
          <br />

          <br />
          <br />
        </Grid>
        {users.map((user) => (
          <Grid key={user.email} container>
            <Grid item md={2} lg={2}>
              <Typography variant="h6" component="div">
                {user.name}
              </Typography>
            </Grid>
            <Grid item md={3} lg={3}>
              <Typography variant="body1" component="div">
                <span>{user.email} </span>
              </Typography>
            </Grid>
            <Grid item md={2} lg={2}>
              <Typography variant="h6" component="div">
                {user.Points}
              </Typography>
            </Grid>
            <Grid item md={1} lg={1}>
              <Typography variant="h6" component="div">
                {user.total_posts}
              </Typography>
            </Grid>
            <Grid item md={3} lg={3}>
              <Typography variant="h6" component="div">
                {user.total_comments}
              </Typography>
            </Grid>
            <Grid item md={1} lg={1}>
              <img src={setBadge(user.Points)} className={classes.badge} />
            </Grid>
          </Grid>
        ))}
      </CardContent>

      <CardActions>
        <Button size="large" color="secondary"></Button>
      </CardActions>
    </Card>
  );
}

export default LeaderBoard;
