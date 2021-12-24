import React, { useState, useEffect } from "react";
import { Box, TextareaAutosize, Button, makeStyles } from "@material-ui/core";

import { newComment, getComments } from "../../service/api";

// Components
import Comment from "./Comment";

const useStyles = makeStyles({
  component: {
    marginTop: "100px",
    display: "flex",
  },
  image: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  textarea: {
    width: "100%",
    margin: "0 20px",
  },
  button: {
    height: "40px",
  },
});

const initialValue = {
  name: "",
  postId: "",
  date: new Date(),
  comments: "",
};

const Comments = ({ post }) => {
  const classes = useStyles();
  const url = "https://static.thenounproject.com/png/12017-200.png";

  const [comment, setComment] = useState(initialValue);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let response = await getComments(post._id);
      setComments(response);
    };
    getData();
  }, [post, toggle]);

  const handleChange = (e) => {
    e.preventDefault();
    setComment({
      ...comment,
      name: post.username,
      postId: post._id,
      comments: e.target.value,
    });
  };
  const postComment = async () => {
    await newComment(comment);
    setToggle((prev) => !prev);
  };
  return (
    <Box>
      <Box className={classes.component}>
        <img className={classes.image} src={url} alt="#dp" />
        <TextareaAutosize
          onChange={handleChange}
          className={classes.textarea}
          minRows={5}
        />
        <Button
          onClick={postComment}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          POST
        </Button>
      </Box>
      {comments &&
        comments.map((comment) => (
          <Comment comment={comment} setToggle={setToggle} />
        ))}
    </Box>
  );
};

export default Comments;
