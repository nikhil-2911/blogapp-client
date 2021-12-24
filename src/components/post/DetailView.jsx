import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { NavLink, useHistory } from "react-router-dom";
import { getPost, deletePost } from "../../service/api";

// Components
import Comments from "../comments/Comments";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 100px",
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
  image: {
    width: "100%",
    height: "50vh",
    objectFit: "cover",
  },
  icons: {
    float: "right",
  },
  icon: {
    margin: 5,
    padding: 5,
    cursor: "pointer",
  },
  heading: {
    fontSize: 38,
    fontWeight: 600,
    textAlign: "center",
    margin: "50px 0 10px 0",
  },
  subheading: {
    color: "#878787",
    display: "flex",
    margin: "20px 0",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const DetailView = () => {
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const url = `https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80`;

  const [post, setPost] = useState({});
  useEffect(() => {
    console.log(id);
    const fetchData = async () => {
      const data = await getPost(id);
      console.log(data);
      setPost(data);
    };
    fetchData();
  }, []);

  const deleteBlog = async () => {
    await deletePost(id);
    history.push("/");
  };
  return (
    <>
      <Box className={classes.container}>
        <img
          src={post.picture || url}
          alt="#banner"
          className={classes.image}
        />
        <Box className={classes.icons}>
          <NavLink to={`/update/${post._id}`}>
            <Edit className={classes.icon} color="primary" />
          </NavLink>
          <Delete onClick={deleteBlog} className={classes.icon} color="error" />
        </Box>
        <Typography className={classes.heading}>{post.title}</Typography>
        <Box className={classes.subheading}>
          <NavLink to={`/?username=${post.username}`} className={classes.link}>
            <Typography>
              Author : <span style={{ fontWeight: 600 }}>{post.username}</span>
            </Typography>
          </NavLink>
          <Typography style={{ marginLeft: "auto" }}>
            {new Date(post.createdDate).toDateString()}
          </Typography>
        </Box>
        <Typography>{post.description}</Typography>
        <Comments post={post} />
      </Box>
    </>
  );
};

export default DetailView;
