import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { getPost, updatePost, uploadFile } from "../../service/api";

import {
  Box,
  makeStyles,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 100px",
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
  },
  image: {
    width: "100%",
    height: "50vh",
    objectFit: "cover",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  textField: {
    flex: 1,
    margin: "0 30px",
    fontSize: 25,
  },
  textArea: {
    width: "100%",
    marginTop: 40,
    border: "none",
    outline: "none",
    fontSize: 18,
  },
}));

const initialValues = {
  title: "",
  description: "",
  picture: "",
  username: "Nikhil Kumar",
  categories: "All",
  createdDate: new Date(),
};
const UpdateView = () => {
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const [post, setPost] = useState(initialValues);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  const url =
    post.picture ||
    `https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80`;

  useEffect(() => {
    const fetchData = async () => {
      let data = await getPost(id);
      console.log(data);
      setPost(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        console.log(file);
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const image = await uploadFile(data);
        post.picture = image.data;
        setImage(image.data);
      }
    };
    getImage();
  }, [file]);

  const handleInputs = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const updateBlog = async () => {
    await updatePost(id, post);
    history.push(`/details/${id}`);
  };
  return (
    <>
      <Box className={classes.container}>
        <img className={classes.image} src={url} alt="#banner" />
        <FormControl className={classes.form}>
          <label htmlFor="fileInput">
            <Add fontSize="large" color="action" />
          </label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            id="fileInput"
            style={{ display: "none" }}
          />
          <InputBase
            name="title"
            placeholder="Title"
            value={post.title}
            onChange={handleInputs}
            className={classes.textField}
          />
          <Button onClick={updateBlog} variant="contained" color="primary">
            UPDATE
          </Button>
        </FormControl>
        <TextareaAutosize
          name="description"
          className={classes.textArea}
          minRows={5}
          value={post.description}
          onChange={handleInputs}
          placeholder="Tell your story..."
        />
      </Box>
    </>
  );
};

export default UpdateView;
