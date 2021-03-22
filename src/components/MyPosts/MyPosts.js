import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./styles.js";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import uparrow from "../.././images/up-arrow.png";
import { Container, Grow, Grid } from "@material-ui/core";
import axios from "axios";

const MyPosts = () => {
  const history = useHistory();
  const user = parseInt(localStorage.getItem("user_id"));
  const [posts, setposts] = useState([]);

  const getPosts = () => {
    axios
      .get("https://morning-temple-69567.herokuapp.com/posts")
      .then((response) => setposts(response.data))
      .catch((error) => {
        //   console.log(error);
      });
  };

  const deletePost = (post_id) => {
   // console.log(post_id);
    axios
      .delete(`https://morning-temple-69567.herokuapp.com/posts/${post_id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        //console.log(response.data);
        getPosts();
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);
  const classes = useStyles();
  return (
    <div>
      <Container fixed>
        <Grid container className={classes.gridc}>
          <Grid item xs={12} className={classes.posts}>
            <Container className={classes.cont}>
              {posts.map((post) =>
                post.user_id === user ? (
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
                        <Button disabled>
                          <img className={classes.voteicon} src={uparrow} />{" "}
                        </Button>
                        <Typography variant="h6">
                          <div>{post.votes}</div>
                        </Typography>
                        <Button
                          size="small"
                          onClick={(e) => deletePost(post.post_id)}
                          color="primary"
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                ) : (
                  <div></div>
                )
              )}
            </Container>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MyPosts;
