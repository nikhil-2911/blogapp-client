import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  Box,
  makeStyles,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { createPost, uploadFile } from "../../service/api";

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

const initialValue = {
  title: "",
  description: "",
  picture: "",
  username: "Nikhil kumar",
  categories: "All",
  createdDate: new Date(),
};

const CreateView = () => {
  const history = useHistory();
  const classes = useStyles();

  const [post, setPost] = useState(initialValue);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  const url = post.picture
    ? post.picture
    : `https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80`;

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

  const handleChange = (e) => {
    e.preventDefault();
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const savePost = async () => {
    await createPost(post);
    history.push("/");
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
            onChange={handleChange}
            placeholder="Title"
            className={classes.textField}
          />
          <Button onClick={savePost} variant="contained" color="primary">
            Publish
          </Button>
        </FormControl>
        <TextareaAutosize
          name="description"
          onChange={handleChange}
          className={classes.textArea}
          minRows={5}
          placeholder="Tell your story..."
        />
      </Box>
    </>
  );
};

export default CreateView;
