import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./Register";

const Publish = () => {
 const [title, setTitle] = useState("");
 const [content, setContent] = useState("");
 const [tags, setTags] = useState("");
 const [error, setError] = useState("");
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   const token = localStorage.getItem("token");
   await axios.post(
    `${apiUrl}/api/blogs`,
    { title, content, tags: tags.split(",") },
    { headers: { Authorization: `Bearer ${token}` } }
   );
   navigate("/");
  } catch (err) {
   setError(err.response?.data?.message || "Failed to publish blog");
  }
 };

 return (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
   <div className="container mx-auto">
    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
     قم بنشر موضوع جديد
    </h1>
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
     {error && <p className="text-red-500 mb-4">{error}</p>}
     <form onSubmit={handleSubmit}>
      <div className="mb-4">
       <label
        htmlFor="title"
        className="block text-gray-700 dark:text-gray-300 mb-2"
       >
        العنوان
       </label>
       <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        required
       />
      </div>
      <div className="mb-4">
       <label
        htmlFor="content"
        className="block text-gray-700 dark:text-gray-300 mb-2"
       >
        المحتوى
       </label>
       <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        rows="6"
        required
       />
      </div>
      <div className="mb-4">
       <label
        htmlFor="tags"
        className="block text-gray-700 dark:text-gray-300 mb-2"
       >
        هاشتاغ (فصل بواسطة الفاصلة)
       </label>
       <input
        type="text"
        id="tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
       />
      </div>
      <button
       type="submit"
       className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
      >
       انشر
      </button>
     </form>
    </div>
   </div>
  </div>
 );
};

export default Publish;
