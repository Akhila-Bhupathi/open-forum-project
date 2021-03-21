import React from "react";
import {
  Paper,
  Typography,
  Container,
  TextField,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import { useState } from "react";
import useStyles from "./styles.js";
import { useHistory } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const classes = useStyles();
  const user = localStorage.getItem("user_id");
  const [selectedFile, setSelectedFile] = useState(null);
  const tokenid = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    user_id: parseInt(user),
    title: "",
    overview: "",
    body: "",
    votes: 0,
  });

  const history = useHistory();
  // const akhi={'one':'two','zeo':'re'};
  const handleSubmit = (e) => {
    const formData1 = new FormData();
    formData1.append("user_id", formData.user_id);
    formData1.append("title", formData.title);
    formData1.append("overview", formData.overview);
    formData1.append("body", formData.body);
    formData1.append("image", selectedFile);
    formData1.append("votes", formData.votes);

    e.preventDefault();
    //  console.log(formData);
    //   console.log(selectedFile);
    // console.log(formData1);
    //console.log(JSON.stringify(formData1));
    /*  axios.post('https://morning-temple-69567.herokuapp.com/posts',formData1).then((response)=>{console.log(response);
   history.push('/');
  }).catch((error)=>{
      console.log(error);
  });   */

    axios
      .post("https://morning-temple-69567.herokuapp.com/posts", formData1, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        //  console.log(response); //
        history.push("/home");
      })
      .catch((error) => {
        // console.log(error);
      });

    //
  };
  return (
    <Container className={classes.div}>
      <Paper
        className={classes.paper}
        style={{ marginTop: "100", padding: 10 }}
        elevation={3}
      >
        <form
          onSubmit={handleSubmit}
          className={classes.form}
          autoComplete="off"
        >
          {" "}
          <Typography variant="h3" style={{ padding: 10 }}>
            Create post
          </Typography>
          <TextField
            className={classes.text}
            variant="standard"
            name="title"
            label="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          ></TextField>
          <TextField
            className={classes.text}
            variant="standard"
            name="overview"
            label="Overview"
            value={formData.overview}
            onChange={(e) =>
              setFormData({ ...formData, overview: e.target.value })
            }
          ></TextField>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={6}
            placeholder="Body"
            label="Body"
            name="body"
            value={formData.body}
            className={classes.textarea}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          />
          <div className={classes.fileIn}>
            <input
              type="file"
              name="image"
              //value={formData.image}
              //onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              // value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.buttonSubmit}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePost;
