import React from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import useStyles from "./styles.js";
import { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import voted from "../.././images/voted.png";

import axios from "axios";
import LeaderBoard from "../LeaderBoard/LeaderBoard";

const Home = () => {
  const history = useHistory();
  const user = localStorage.getItem("user_id");
  const [user1, setUser] = useState();
  const [posts, setposts] = useState([]);
  
  
  const getPosts = () => {
    axios
      .get("https://morning-temple-69567.herokuapp.com/posts")
      .then((response) => setposts(response.data))
      .catch((error) => {
        //     console.log(error);
      });
  };


  useEffect(() => {
    getPosts();
    setUser(localStorage.getItem("user_id"));
  }, []);

  const classes = useStyles();
  return (
    <Grow in>
      <Container fixed>
        <Grid container className={classes.gridc}>
          <Grid item xs={6} className={classes.posts}>
            <Container className={classes.cont}>
              {posts.map((post) => (
                <div key={post.post_id} className={classes.divc}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      {post.image && (
                        <CardMedia
                          component="img"
                          height="400"
                          image={`https://morning-temple-69567.herokuapp.com/images/uploads/${post.image}`}
                          title={post.title}
                        />
                      )}

                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {post.overview}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        disabled={!user}
                      >
                        <img className={classes.voteicon} src={voted} />{" "}
                      </Button>
                      <Typography variant="h6">
                        <div>{post.votes}</div>
                      </Typography>
                      <Button
                        size="small"
                        disabled={!user}
                        color="primary"
        
                      >
                        More
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              ))}
            </Container>
          </Grid>
          <Grid item xs={6} className={classes.leader}>
            <LeaderBoard />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;

// {(post_to_be_updated==post.post_id)  ?
