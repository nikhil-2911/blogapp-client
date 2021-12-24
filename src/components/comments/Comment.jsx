import React from "react";
import { Typography, Box, makeStyles } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import { deleteComment } from "../../service/api";

const useStyles = makeStyles({
  component: {
    marginTop: "30px",
    background: "#f5f5f5",
    padding: "10px",
  },
  container: {
    display: "flex",
    marginBottom: "5px",
  },
  name: {
    fontSize: "16px",
    fontWeight: 600,
    marginRight: 20,
  },
  date: {
    fontSize: "16px",
    color: "#878787",
  },
  delete: {
    marginLeft: "auto",
    pointer: "cursor",
  },
});

const Comment = ({ comment, setToggle }) => {
  const classes = useStyles();
  //   console.log(comment);

  const removeComment = async () => {
    await deleteComment(comment._id);
    setToggle((prev) => !prev);
  };

  return (
    <Box className={classes.component}>
      <Box className={classes.container}>
        <Typography className={classes.name}>{comment.name}</Typography>
        <Typography className={classes.date}>
          {new Date(comment.date).toDateString()}
        </Typography>
        <Delete onClick={removeComment} className={classes.delete} />
      </Box>
      <Typography>{comment.comments}</Typography>
    </Box>
  );
};

export default Comment;
