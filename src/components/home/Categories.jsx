import React from "react";
import {
  Button,
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { categories } from "../../constants/data";
import { NavLink } from "react-router-dom";

const useStyle = makeStyles({
  create: {
    margin: 20,
    width: "86%",
  },
  table: {
    border: "1px solid rgba(224,224,224,1)",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
});
const Categories = () => {
  const classes = useStyle();
  return (
    <>
      <NavLink className={classes.link} to="/create">
        <Button variant="contained" color="primary" className={classes.create}>
          Create Blog
        </Button>
      </NavLink>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <NavLink to={"/"} className={classes.link}>
                All Categories
              </NavLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow>
              <TableCell className={classes.category}>
                <NavLink to={`/?category=${category}`} className={classes.link}>
                  {category}
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Categories;
