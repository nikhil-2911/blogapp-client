import { React, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { NavLink, useLocation } from "react-router-dom";

// api
import { getAllPosts } from "../../service/api";

// Components
import Post from "./Post";

const Posts = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      console.log(search);
      let data = await getAllPosts(search);
      console.log(data);
      setPosts(data);
    };
    fetchData();
    // getAllPosts is an async function
  }, [search]);
  return (
    <>
      {posts.map((post) => (
        <Grid item lg={3} sm={4} xs={12}>
          <NavLink
            to={`/details/${post._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Post post={post} />
          </NavLink>
        </Grid>
      ))}
    </>
  );
};

export default Posts;
