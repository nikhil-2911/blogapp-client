import axios from "axios";

// const URL = "http://localhost:5000";
const URL = "https://myblog-server.herokuapp.com";

export const createPost = async (post) => {
  try {
    return await axios.post(`${URL}/create`, post);
  } catch (err) {
    console.log("Error while calling createPost API", err);
  }
};

export const getAllPosts = async (param) => {
  try {
    let response = await axios.get(`${URL}/posts${param}`); // / ?
    return response.data;
  } catch (err) {
    console.log("Error while calling getAllPosts API", err);
  }
};

export const getPost = async (id) => {
  try {
    let response = await axios.get(`${URL}/post/${id}`);
    return response.data;
  } catch (err) {
    console.log("Error while calling getPost API", err);
  }
};

export const updatePost = async (id, post) => {
  try {
    return await axios.post(`${URL}/update/${id}`, post);
  } catch (err) {
    console.log("Error while updating post", err);
  }
};

export const deletePost = async (id) => {
  try {
    return await axios.delete(`${URL}/delete/${id}`);
  } catch (err) {
    console.log("Error while deleting post", err);
  }
};

export const uploadFile = async (data) => {
  try {
    return await axios.post(`${URL}/file/upload`, data);
  } catch (err) {
    console.log("Error while uploading file", err);
  }
};

export const newComment = async (data) => {
  try {
    return await axios.post(`${URL}/comment/new`, data);
  } catch (err) {
    console.log("Error while calling newComment API", err);
  }
};

export const getComments = async (id) => {
  try {
    let res = await axios.get(`${URL}/comments/${id}`);
    return res.data;
  } catch (err) {
    console.log("Error while calling getComments API", err);
  }
};

export const deleteComment = async (id) => {
  try {
    return await axios.delete(`${URL}/comment/delete/${id}`);
  } catch (err) {
    console.log("Error while calling deleteComment API", err);
  }
};
