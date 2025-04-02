import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../pages/blog/Register";
import { Link } from "react-router-dom";
import Loader from "../blog/Loader";
import { useTheme } from "../../context/ThemeContext";

const BlogsList = () => {
 const [blogs, setBlogs] = useState([]);
 const [loadingBlogs, setLoadingBlogs] = useState(false);
 const [error, setError] = useState(null);
 const [deletingBlog, setDeletingBlog] = useState(false);
 const [updatingStatus, setUpdatingStatus] = useState(false);
 const [loadingApprove, setLoadingApprove] = useState(false);
 const { colors, darkMode: isDark } = useTheme();

 useEffect(() => {
  fetchBlogs();
 }, []);

 const fetchBlogs = async () => {
  setLoadingBlogs(true);
  setError(null);
  try {
   const response = await axios.get(`${apiUrl}/api/admin/blogs`, {
    withCredentials: true,
   });
   setBlogs(response.data);
  } catch (error) {
   console.error(error);
   setError(" حدث خطأ ما، يرجى المحاولة مرة أخرى.");
  } finally {
   setLoadingBlogs(false);
  }
 };

 const handleToggleStatus = async (blogId) => {
  setUpdatingStatus(true);
  try {
   const csrfResponse = await axios.get(`${apiUrl}/api/auth/csrf-token`, {
    withCredentials: true,
   });
   await axios.put(
    `${apiUrl}/api/admin/blogs/${blogId}/status`,
    {},
    {
     withCredentials: true,
     headers: {
      "X-CSRF-Token": csrfResponse.data.csrfToken,
     },
    }
   );
   fetchBlogs();
  } catch (error) {
   console.error(error);
  } finally {
   setUpdatingStatus(false);
  }
 };

 const handleDeleteBlog = async (blogId) => {
  if (!window.confirm("هل أنت متأكد؟")) return;
  setDeletingBlog(true);
  try {
   const csrfResponse = await axios.get(`${apiUrl}/api/auth/csrf-token`, {
    withCredentials: true,
   });
   await axios.delete(`${apiUrl}/api/blogs/${blogId}`, {
    withCredentials: true,
    headers: {
     "X-CSRF-Token": csrfResponse.data.csrfToken,
    },
   });
   fetchBlogs();
  } catch (error) {
   console.error(error);
  } finally {
   setDeletingBlog(false);
  }
 };

 const handleApproveBlog = async (blogId) => {
  setLoadingApprove(true);
  try {
   const resp = await axios.get(`${apiUrl}/api/admin/approve-blog/${blogId}`, {
    withCredentials: true,
   });
   setBlogs((prevBlogs) =>
    prevBlogs.map((blog) =>
     blog._id === blogId ? { ...blog, status: resp.data.status } : blog
    )
   );
  } catch (error) {
   console.log(error);
  } finally {
   setLoadingApprove(false);
  }
 };

 if (loadingBlogs) return <Loader />;
 if (error) return <p className="text-red-600 py-6 text-center">{error}</p>;

 return (
  <div className="overflow-x-auto">
   <table
    style={{
     backgroundColor: isDark
      ? colors.dark.secondaryBackground
      : colors.light.secondaryBackground,
    }}
    className="min-w-full divide-y overflow-y-scroll"
   >
    <thead
     style={{
      backgroundColor: isDark
       ? colors.dark.secondaryBackground
       : colors.light.secondaryBackground,
     }}
    >
     <tr
      style={{
       color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
      }}
     >
      <th className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium">
       العنوان
      </th>
      <th className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium hidden sm:table-cell">
       الكاتب
      </th>
      <th className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium">
       الخصوصية
      </th>
      <th className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium">
       الإجراءات
      </th>
     </tr>
    </thead>
    <tbody
     style={{
      backgroundColor: isDark
       ? colors.dark.secondaryBackground
       : colors.light.secondaryBackground,
     }}
     className="divide-y divide-gray-200 dark:divide-gray-700"
    >
     {blogs.map((blog) => (
      <tr
       key={blog._id}
       className={`${
        blog.status === "pending" ? "bg-yellow-100 dark:bg-blue-300/10" : ""
       }`}
      >
       <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm">
        <Link
         to={`/blog/${blog._id}`}
         style={{
          color: isDark ? colors.dark.primaryBtn : colors.light.primaryBtn,
         }}
         className="hover:underline"
        >
         {blog.title.length > 30
          ? blog.title.substring(0, 30) + "..."
          : blog.title}
        </Link>
        <p
         style={{
          color: isDark
           ? colors.dark.secondaryColor
           : colors.light.secondaryColor,
         }}
         className="text-xs block sm:hidden"
        >
         الكاتب: {blog.author.username}
        </p>
       </td>
       <td
        style={{
         color: isDark
          ? colors.dark.secondaryColor
          : colors.light.secondaryColor,
        }}
        className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm hidden sm:table-cell"
       >
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
          style={{
           backgroundColor: isDark
            ? colors.dark.primaryBtn
            : colors.light.primaryBtn,
          }}
          onClick={() => handleToggleStatus(blog._id)}
          disabled={updatingStatus}
          className="opacity-90 hover:opacity-100 transition-opacity duration-300 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm"
         >
          {updatingStatus ? "جاري التحديث" : !blog.private ? "اخفاء" : "عام"}
         </button>
         <button
          onClick={() => handleDeleteBlog(blog._id)}
          disabled={deletingBlog}
          style={{
           backgroundColor: isDark
            ? colors.dark.tertiaryBtn
            : colors.light.tertiaryBtn,
          }}
          className="opacity-90 hover:opacity-100 transition-opacity duration-300 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm"
         >
          {deletingBlog ? "جاري الحذف" : "حذف"}
         </button>
         {blog.status === "pending" && (
          <button
           onClick={() => handleApproveBlog(blog._id)}
           disabled={loadingApprove}
           style={{
            backgroundColor: isDark
             ? colors.dark.secondaryBtn
             : colors.light.secondaryBtn,
           }}
           className="opacity-90 hover:opacity-100 transition-opacity duration-300 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm"
          >
           {loadingApprove ? "جاري الموافقة" : "موافقة"}
          </button>
         )}
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
