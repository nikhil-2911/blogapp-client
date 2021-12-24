import React from "react";
import { Grid } from "@material-ui/core";
// Components
import Banner from "./Banner";
import Categories from "./Categories";
import Posts from "./Posts";

const Home = () => {
  return (
    <>
      <Banner />
      <Grid container>
        {/*items always side by side */}
        <Grid item lg={2} xs={12} sm={2}>
          <Categories />
        </Grid>
        <Grid item container lg={10} xs={12} sm={10}>
          <Posts />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
