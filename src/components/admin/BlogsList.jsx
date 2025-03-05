import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../pages/blog/Register";
import { Link } from "react-router-dom";

const BlogsList = () => {
 const [blogs, setBlogs] = useState([]);
 const token = localStorage.getItem("token");

 useEffect(() => {
  fetchBlogs();
 }, []);

 const fetchBlogs = async () => {
  try {
   const response = await axios.get(`${apiUrl}/api/admin/blogs`, {
    headers: { Authorization: `Bearer ${token}` },
   });
   setBlogs(response.data);
  } catch (error) {
   console.error(error);
  }
 };

 const handleToggleStatus = async (blogId) => {
  try {
   await axios.put(
    `${apiUrl}/api/admin/blogs/${blogId}/status`,
    {},
    {
     headers: { Authorization: `Bearer ${token}` },
    }
   );
   fetchBlogs();
  } catch (error) {
   console.error(error);
  }
 };

 const handleDeleteBlog = async (blogId) => {
  if (!window.confirm("هل أنت متأكد؟")) return;
  try {
   await axios.delete(`${apiUrl}/api/blogs/${blogId}`, {
    headers: { Authorization: `Bearer ${token}` },
   });
   fetchBlogs();
  } catch (error) {
   console.error(error);
  }
 };

 return (
  <div className="overflow-x-auto">
   <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
    <thead className="bg-gray-50 dark:bg-gray-800">
     <tr>
      <th className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300">
       العنوان
      </th>
      <th className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 hidden sm:table-cell">
       الكاتب
      </th>
      <th className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300">
       الحالة
      </th>
      <th className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300">
       الإجراءات
      </th>
     </tr>
    </thead>
    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
     {blogs.map((blog) => (
      <tr key={blog._id}>
       <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm">
        <Link
         to={`/blog/${blog._id}`}
         className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
         {blog.title.length > 30
          ? blog.title.substring(0, 30) + "..."
          : blog.title}
        </Link>
       </td>
       <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 hidden sm:table-cell">
        {blog.author.username}
       </td>
       <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm">
        <span
         className={`px-2 py-1 rounded text-xs ${
          !blog.private
           ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
           : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
         }`}
        >
         {!blog.private ? "عام" : "خاص"}
        </span>
       </td>
       <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm">
        <div className="flex flex-col sm:flex-row gap-2">
         <button
          onClick={() => handleToggleStatus(blog._id)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm"
         >
          {!blog.private ? "اخفاء" : "نشر"}
         </button>
         <button
          onClick={() => handleDeleteBlog(blog._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm"
         >
          حذف
         </button>
        </div>
       </td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 );
};

export default BlogsList;
