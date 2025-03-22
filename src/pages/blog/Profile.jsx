import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "./Register";
import Loader from "../../components/blog/Loader";
import { Link } from "react-router-dom";
import BlogCard from "../../components/blog/BlogCard";
import { useAuth } from "../../context/AuthContext";
import BackToHome from "../../components/BackToHome";
import { MdDashboardCustomize } from "react-icons/md";

const Profile = () => {
 const { currentUser } = useAuth();
 const [profilePicture, setProfilePicture] = useState("");
 const [oldPassword, setOldPassword] = useState("");
 const [newPassword, setNewPassword] = useState("");
 const [message, setMessage] = useState("");
 const [blogs, setBlogs] = useState([]);
 const [totalPages, setTotalPages] = useState(1);
 const [currentPage, setCurrentPage] = useState(1);
 const [isLoading, setIsLoading] = useState(false);
 const token = localStorage.getItem("token");

 const handleProfileUpdate = async (e) => {
  e.preventDefault();
  try {
   await axios.put(
    `${apiUrl}/api/users/profile`,
    { profilePicture },
    { headers: { Authorization: `Bearer ${token}` } }
   );
   setMessage("Profile updated successfully");
  } catch (err) {
   setMessage(err.response?.data?.message || "Failed to update profile");
  }
 };

 const handlePasswordChange = async (e) => {
  e.preventDefault();
  try {
   await axios.put(
    `${apiUrl}/api/users/change-password`,
    { oldPassword, newPassword },
    { headers: { Authorization: `Bearer ${token}` } }
   );
   setMessage("Password changed successfully");
  } catch (err) {
   setMessage(err.response?.data?.message || "Failed to change password");
  }
 };

 useEffect(() => {
  fetchBlogs();
 }, [currentPage]);

 const fetchBlogs = async () => {
  setIsLoading(true);
  try {
   const response = await axios.get(
    `${apiUrl}/api/blogs/user?page=${currentPage}&limit=10`,
    {
     headers: { Authorization: `Bearer ${token}` },
    }
   );
   setBlogs(response.data.blogs);
   setTotalPages(response.data.totalPages);
  } catch (err) {
   console.error(err);
  } finally {
   setIsLoading(false);
  }
 };

 if (isLoading) return <Loader />;

 return (
  <>
   <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 flex flex-col gap-6 mx-auto container">
    <div className="container mx-auto">
     <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
      الصفحة الشخصية
     </h1>
     {currentUser?.role !== "user" && (
      <Link
       to="/admin"
       className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-600/70 transition duration-200 cursor-pointer mb-4 flex items-center gap-1 w-fit"
      >
       <MdDashboardCustomize /> لوحة التحكم
      </Link>
     )}
     <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
       تعديل المعلومات الشخصية
      </h2>
      <form onSubmit={handleProfileUpdate} className="mb-6">
       <input
        type="text"
        placeholder="رابط الصورة"
        value={profilePicture}
        onChange={(e) => setProfilePicture(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
       />
       <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
       >
        حفظ
       </button>
      </form>
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
       تغيير الرمز السري
      </h2>
      <form onSubmit={handlePasswordChange}>
       <input
        type="password"
        placeholder="الرمز السري القديم"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
       />
       <input
        type="password"
        placeholder="الرمز السري الجديد"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
       />
       <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
       >
        حفظ الرمز السري الجديد
       </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
     </div>
    </div>

    {blogs.length > 0 && (
     <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
       منشوراتي
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {blogs?.map((blog) => (
        <Link to={`/blog/${blog._id}`} key={blog._id}>
         <BlogCard blog={blog} />
        </Link>
       ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
       <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
         <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`mx-1 px-4 py-2 rounded ${
           currentPage === i + 1
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          }`}
         >
          {i + 1}
         </button>
        ))}
       </div>
      )}
     </div>
    )}
   </div>
   <BackToHome />
  </>
 );
};

export default Profile;
