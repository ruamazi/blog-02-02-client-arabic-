import axios from "axios";
import { apiUrl } from "../pages/blog/Register";
const token = localStorage.getItem("token");

export const fetchBlog = async (id) => {
 try {
  const response = await axios.get(`${apiUrl}/api/blogs/${id}`);
  return response.data;
 } catch (err) {
  throw new Error("Failed to fetch blog");
 }
};

export const postComment = async (comment, blogId) => {
 try {
  await axios.post(
   `${apiUrl}/api/comments`,
   { content: comment, blogId },
   { headers: { Authorization: `Bearer ${token}` } }
  );
 } catch (err) {
  throw new Error("Failed to post comment");
 }
};

export const deleteBlog = async (blogId) => {
 try {
  await axios.delete(`${apiUrl}/api/blogs/${blogId}`, {
   headers: { Authorization: `Bearer ${token}` },
  });
 } catch (err) {
  throw new Error("Failed to delete blog");
 }
};

export const deleteComment = async (commentId) => {
 try {
  await axios.delete(`${apiUrl}/api/comments/${commentId}`, {
   headers: { Authorization: `Bearer ${token}` },
  });
 } catch (err) {
  throw new Error("Failed to delete comment");
 }
};

export const toggleComments = async (blogId) => {
 try {
  const resp = await axios.patch(
   `${apiUrl}/api/blogs/${blogId}/toggle-comments`,
   {},
   { headers: { Authorization: `Bearer ${token}` } }
  );
  return resp.data.blog;
 } catch (err) {
  throw new Error("Failed to toggle comments");
 }
};

export const likeDislike = async (action, blogId) => {
 try {
  const resp = await axios.put(
   `${apiUrl}/api/blogs/${action}/${blogId}`,
   {},
   { headers: { Authorization: `Bearer ${token}` } }
  );
  return resp.data;
 } catch (err) {
  throw new Error("Failed to like/dislike blog");
 }
};

export const makeBlogPrivate = async (blogId) => {
 try {
  const resp = await axios.put(
   `${apiUrl}/api/blogs/private/${blogId}`,
   {},
   { headers: { Authorization: `Bearer ${token}` } }
  );
  return resp.data;
 } catch (error) {
  throw new Error("Failed to make this change");
 }
};

export const getWebData = async () => {
 try {
  const resp = await axios.get(`${apiUrl}/api/blogs/web-data`);
  return resp.data;
 } catch (error) {
  log(error);
  throw new Error("Failed to get web data");
 }
};

export const getCurrentUser = async () => {
 if (!token) return;
 try {
  const resp = await axios.get(`${apiUrl}/api/users/profile`, {
   headers: { Authorization: `Bearer ${token}` },
  });
  return resp.data;
 } catch (error) {
  console.error("Failed to fetch user profile", error);
  localStorage.removeItem("token");
 }
};
