import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  Paper,
  Typography,
  Container,
  Grid,
  ButtonBase,
  TextField,
  Button,
} from "@material-ui/core";
import useStyles from "./styles.js";
import uparrow from "../.././images/up-arrow.png";
import downarrow from "../.././images/down-arrow.png";
import { useHistory } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";

const CompletePost = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const post_id1 = props.match.params.post;
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [c, setC] = useState([]);

  var commentd = [];

  const user = localStorage.getItem("user_id");
  const [newcomment, setNewComment] = useState({
    user_id: parseInt(user),
    body: "",
    votes: 0,
  });
  const id = localStorage.getItem("id");

  const getPosts = () => {
    axios
      .get(
        `https://morning-temple-69567.herokuapp.com/posts/${post_id1}/${user}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setPosts(response.data.post);
        var com = response.data.comments;

        setC([]);
        com.map((comment) => {
          var d = {
            com_id: comment.com_id,
            body: comment.body,
            name: comment.name,
            votes: comment.votes,
          };
          setC((c) => [...c, d]);
        });
        // console.log(c);
      })
      .catch((error) => {
        //   console.log(error);
      });
  };

  const voteComment = (e, com_id) => {
    var data = {
      user_id: parseInt(localStorage.getItem("user_id")),
      com_id: com_id,
    };

    axios
      .post(
        "https://morning-temple-69567.herokuapp.com/votes/comments",
        JSON.stringify(data),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        let newc = [...c];
        var index = newc.findIndex((com) => com.com_id == com_id);
        newc[index].votes = response.data.votes;
        newc.sort((a, b) => (a.votes > b.votes ? -1 : 1));
        setC(newc);

        //votes=response.data;
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const downvoteComment = (e, com_id) => {
    var data = {
      user_id: parseInt(localStorage.getItem("user_id")),
      com_id: com_id,
    };
    axios
      .post(
        "https://morning-temple-69567.herokuapp.com/votes/down/comments",
        JSON.stringify(data),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        let newc = [...c];
        var index = newc.findIndex((com) => com.com_id == com_id);
        newc[index].votes = response.data.votes;
        newc.sort((a, b) => (a.votes > b.votes ? -1 : 1));
        setC(newc);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();

    axios
      .post(
        `https://morning-temple-69567.herokuapp.com/posts/${post_id1}/comments`,
        newcomment
      )
      .then((response) => {
        var newc = {
          com_id: response.data.com_id,
          body: response.data.body,
          name: localStorage.getItem("name"),
          votes: 0,
        };
        setC((c) => [...c, newc]);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const date=(dateStr)=>{
    
    var a=dateStr.split(" ");
var d=a[0].split("-");
var t=a[1].split(":");
var formatedDate = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);
return formatedDate.toString().substr(0,25);
  }
  return (
    <>
      <Container maxwidth="sm" className={classes.con}>
        <Typography variant="h3" align="center" className={classes.text}>
          {posts.title}
        </Typography>
        <Typography variant="subtitle1" align="center" className={classes.text}>
          {posts.overview}
        </Typography>

        {posts.image && (
          <Grid container spacing={3} justify="center" className={classes.grid}>
            <Grid
              item
              variant="contained"
              xs={6}
              md={6}
              className={classes.griditem}
            >
              <img
                className={classes.img}
                src={`https://morning-temple-69567.herokuapp.com/images/uploads/${posts.image}`}
              />
            </Grid>
            <Grid
              item
              variant="contained"
              xs={6}
              md={6}
              className={classes.griditem}
            >
              <Typography
                variant="body2"
                align="center"
                className={classes.body}
              >
                {posts.body}
              </Typography>
              <div className={classes.pro}>
                <br />
                <br />
                <br />
                <br />
                <Typography variant="h6" className={classes.name}>
                  {posts.name}
                </Typography>
                <Typography variant="h6" className={classes.date}>
                  {date(posts.created)}
                </Typography>
              </div>
            </Grid>
          </Grid>
        )}

        {!posts.image && (
          <Paper className={classes.noimage} elevation={2}>
            <Typography variant="body2" align="center" className={classes.body}>
              {posts.body}
            </Typography>

            <br />
            <br />
            <Typography variant="h6" className={classes.name}>
              {posts.name}
            </Typography>
            <Typography variant="h6" className={classes.date}>
              {/*{posts.created} */}
            </Typography>
          </Paper>
        )}
        <Typography variant="h4" style={{ marginTop: 100, marginBottom: 40 }}>
          Add a comment
        </Typography>

        {id && (
          <Paper className={classes.cpaper}>
            <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                className={classes.text}
                variant="standard"
                name="body"
                label="Comment"
                fullWidth
                onChange={(e) =>
                  setNewComment({ ...newcomment, body: e.target.value })
                }
              ></TextField>
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonSubmit}
                type="submit"
                className={classes.button}
                endIcon={<SendIcon />}
              ></Button>
            </form>
          </Paper>
        )}

        <Typography className={classes.commentstr} variant="h4">
          Comments
        </Typography>
        {c.length == 0 && (
          <Paper>
            <Typography variant="body2">No comments</Typography>
          </Paper>
        )}

        {c.map((comment) => (
          <Paper>
            <Grid
              container
              spacing={3}
              key={comment.com_id}
              className={classes.comment}
            >
              <Grid item xs={12} sm={10} className={classes.cgrid}>
                <Typography variant="h6" className={classes.cname}>
                  {comment.name}
                </Typography>
                <Typography variant="body1" className={classes.cbody}>
                  {comment.body}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2} className={classes.cgrid}>
                <Button onClick={(e) => voteComment(e, comment.com_id)}>
                  <img src={uparrow} className={classes.voteicon} />
                </Button>{" "}
                &nbsp;&nbsp;
                <Typography variant="h6" className={classes.cvotes}>
                  {comment.votes}
                </Typography>
                &nbsp;&nbsp;
                <Button onClick={(e) => downvoteComment(e, comment.com_id)}>
                  <img src={downarrow} className={classes.voteicon} />
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Container>
    </>
  );
};

export default CompletePost;
