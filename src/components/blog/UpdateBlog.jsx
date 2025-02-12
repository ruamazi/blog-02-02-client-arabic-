import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { apiUrl } from "../../pages/blog/Register";
import Loader from "./Loader";

const UpdateBlog = () => {
 const { id } = useParams();
 const [blog, setBlog] = useState({ title: "", content: "", tags: [] });
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
 const [saving, setSaving] = useState(false);
 const navigate = useNavigate();

 useEffect(() => {
  fetchBlog();
 }, [id]);

 const fetchBlog = async () => {
  try {
   const resp = await axios.get(`${apiUrl}/api/blogs/${id}`);
   setBlog(resp.data);
   setLoading(false);
  } catch (err) {
   setError("Failed to fetch blog");
   setLoading(false);
  }
 };

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setBlog({ ...blog, [name]: value });
 };

 const handleTagsChange = (e) => {
  const tags = e.target.value.split(",").map((tag) => tag.trim());
  setBlog({ ...blog, tags });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);
  setError(null);
  try {
   const token = localStorage.getItem("token");
   await axios.put(`${apiUrl}/api/blogs/${id}`, blog, {
    headers: { Authorization: `Bearer ${token}` },
   });
   navigate(`/blog/${id}`);
  } catch (err) {
   if (err.response && err.response.data && err.response.data.message) {
    setError(err.response.data.message);
   } else {
    setError("حدث خطأ اثناء تعديل المدونة");
   }
   console.log(err);
  } finally {
   setSaving(false);
  }
 };

 if (loading) return <Loader />;

 return (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
   <div className="container mx-auto">
    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
     Update Blog
    </h1>
    <form
     onSubmit={handleSubmit}
     className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
     <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2">
       Title
      </label>
      <input
       type="text"
       name="title"
       value={blog.title}
       onChange={handleInputChange}
       className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
       required
      />
     </div>
     <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2">
       Content
      </label>
      <textarea
       name="content"
       value={blog.content}
       onChange={handleInputChange}
       className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
       rows="6"
       required
      />
     </div>
     <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2">
       Tags (comma separated)
      </label>
      <input
       type="text"
       value={blog.tags.join(", ")}
       onChange={handleTagsChange}
       className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
      />
     </div>
     {error && <p className="text-red-500 mb-4">{error}</p>}
     <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
     >
      {saving ? "Saving..." : "Save"}
     </button>
    </form>
   </div>
  </div>
 );
};

export default UpdateBlog;
