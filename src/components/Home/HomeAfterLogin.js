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
import notvoted from "../.././images/not-voted.png";
import axios from "axios";
import LeaderBoard from "../LeaderBoard/LeaderBoard";

const HomeAfterLogin = () => {
  const history = useHistory();
  const user = localStorage.getItem("user_id");
  const [user1, setUser] = useState();
  const [posts, setposts] = useState([]);

  const [data, setData] = useState({ user_id: "", post_id: "" });
  var votes;


  const getPosts = () => {
    axios
      .get(`https://morning-temple-69567.herokuapp.com/posts/log/${user}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        setposts(response.data);
      })
      .catch((error) => {
        //   console.log(error);
      });
  };


  const vote = (post_id) => {
    //console.log("Voted");
    //console.log(post_id);

    //setPostToBe(post_id);
    //setData({...data,post_id:post_id});
    var data = {
      user_id: parseInt(localStorage.getItem("user_id")),
      post_id: post_id,
    };
    // console.log(data);
    // console.log(JSON.stringify(data));
    // setData({...data,post_id:post_id});
    // console.log(data);
    // callApi();
    // const data={"user_id":user,"post_id":post_id};
    axios
      .post(
        "https://morning-temple-69567.herokuapp.com/votes/posts",
        JSON.stringify(data),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        //console.log(response.data);
        getPosts(); //http://localhost:5000
        //localStorage.setItem("user_id",response.data.user_id);
        //history.push('/');

        votes = response.data;
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const downvote = (post_id) => {
    console.log(" down Voted");
    //console.log(post_id);

    //setPostToBe(post_id);
    //setData({...data,post_id:post_id});
    var data = {
      user_id: parseInt(localStorage.getItem("user_id")),
      post_id: post_id,
    };

    axios
      .post(
        "https://morning-temple-69567.herokuapp.com/votes/down/posts",
        JSON.stringify(data),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        getPosts(); //http://localhost:5000

        votes = response.data;
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const send = (id) => {
    history.push(`/completepost/${id}`);
  };

  useEffect(() => {
    getPosts();
    setUser(localStorage.getItem("user_id"));
    setData({ ...data, user_id: parseInt(user1) });
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
                      {user && post.voted == 0 ? (
                        <Button
                          disabled={!user}
                          onClick={(e) => {
                            vote(post.post_id);
                          }}
                        >
                          <img className={classes.voteicon} src={notvoted} />{" "}
                        </Button>
                      ) : (
                        <Button
                          disabled={!user}
                          onClick={(e) => {
                            downvote(post.post_id);
                          }}
                        >
                          <img className={classes.voteicon} src={voted} />{" "}
                        </Button>
                      )}

                      <Typography variant="h6">
                        <div>{post.votes}</div>
                      </Typography>
                      <Button
                        size="small"
                        disabled={!user}
                        color="primary"
                        onClick={() => send(post.post_id)}
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

export default HomeAfterLogin;


