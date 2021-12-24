import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { NavLink, useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const useStyles = makeStyles({
  component: {
    background: "#ffffff",
    color: "black",
  },
  container: {
    justifyContent: "center",
    "&>*": {
      padding: 20,
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
});

const Header = () => {
  const history = useHistory();
  const classes = useStyles();
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState && authState.isPending) return null;

  const login = async () => history.push("/login");

  const logout = async () => oktaAuth.signOut();

  const button = authState.isAuthenticated ? (
    <button
      style={{
        background: "unset",
        border: "none",
        textTransform: "uppercase",
        fontFamily: "Roboto",
        fontSize: 16,
        cursor: "pointer",
      }}
      onClick={logout}
    >
      Logout
    </button>
  ) : (
    <button onClick={login}>Login</button>
  );
  return (
    <AppBar className={classes.component}>
      <Toolbar className={classes.container}>
        <NavLink className={classes.link} to="/">
          <Typography>HOME</Typography>
        </NavLink>
        <Typography>ABOUT</Typography>
        <Typography>CONTACT</Typography>
        <Typography>{button}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
