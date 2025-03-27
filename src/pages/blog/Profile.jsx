import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "./Register";
import Loader from "../../components/blog/Loader";
import { Link } from "react-router-dom";
import BlogCard from "../../components/blog/BlogCard";
import { useAuth } from "../../context/AuthContext";
import BackToHome from "../../components/BackToHome";
import { MdDashboardCustomize } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";
import { isValidImageUrl } from "../../functions/helpers";

const Profile = ({ setCurrentUser }) => {
 const { currentUser } = useAuth();
 const [profilePicture, setProfilePicture] = useState("");
 const [oldPassword, setOldPassword] = useState("");
 const [newPassword, setNewPassword] = useState("");
 const [message, setMessage] = useState("");
 const [error, setError] = useState("");
 const [blogs, setBlogs] = useState([]);
 const [totalPages, setTotalPages] = useState(1);
 const [currentPage, setCurrentPage] = useState(1);
 const [isLoading, setIsLoading] = useState(false);
 const [updatingProfile, setUpdatingProfile] = useState(false);
 const token = localStorage.getItem("token");
 const { colors, darkMode: isDark } = useTheme();

 const handleProfileUpdate = async (e) => {
  e.preventDefault();
  setUpdatingProfile(true);
  setMessage("");
  setError("");
  try {
   if (!profilePicture || profilePicture.trim() === "") {
    setError("يرجى إدخال رابط الصورة");
    return;
   }
   if (!isValidImageUrl(profilePicture)) {
    setError("الرابط المدخل ليس رابط صورة صالح");
    return;
   }
   const resp = await axios.put(
    `${apiUrl}/api/users/profile`,
    { profilePicture },
    { headers: { Authorization: `Bearer ${token}` } }
   );
   setCurrentUser(resp.data);
   setMessage("تم تحديث الملف الشخصي بنجاح");
  } catch (err) {
   console.log(err);
   setError(err.response?.data?.error || "فشل في تحديث الملف الشخصي");
  } finally {
   setUpdatingProfile(false);
  }
 };

 const handlePasswordChange = async (e) => {
  e.preventDefault();
  console.log("clicked");
  setUpdatingProfile(true);
  setMessage("");
  setError("");
  try {
   await axios.put(
    `${apiUrl}/api/users/change-password`,
    { oldPassword, newPassword },
    { headers: { Authorization: `Bearer ${token}` } }
   );
   setMessage("تغيير الرمز السري بنجاح");
  } catch (err) {
   setError(err.response?.data?.error || "فشل في تغيير الرمز السري");
  } finally {
   setUpdatingProfile(false);
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
   <div className="min-h-screen p-4 flex flex-col gap-6 mx-auto container">
    <div className="container mx-auto">
     <h1
      style={{
       color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
      }}
      className="text-3xl font-bold mb-6"
     >
      الصفحة الشخصية
     </h1>
     {currentUser?.role !== "user" && (
      <Link
       to="/admin"
       style={{
        backgroundColor: isDark
         ? colors.dark.quaternaryBtn
         : colors.light.quaternaryBtn,
       }}
       className="opacity-85 hover:opacity-100 text-white px-4 py-2 rounded-lg transition duration-200 
       mb-4 flex items-center gap-1 w-fit"
      >
       <MdDashboardCustomize className="mb-1" /> لوحة التحكم
      </Link>
     )}
     <div
      style={{
       backgroundColor: isDark
        ? colors.dark.secondaryBackground
        : colors.light.secondaryBackground,
      }}
      className="p-6 rounded-lg shadow-md mx-auto max-w-[750px]"
     >
      <h2
       style={{
        color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
       }}
       className="text-xl font-bold mb-4"
      >
       تعديل المعلومات الشخصية
      </h2>
      <form onSubmit={handleProfileUpdate} className="mb-6">
       <input
        type="text"
        placeholder="رابط الصورة"
        value={profilePicture}
        onChange={(e) => setProfilePicture(e.target.value)}
        style={{
         backgroundColor: isDark
          ? colors.dark.primaryBackground
          : colors.light.primaryBackground,
        }}
        className="w-full px-4 py-2  rounded-lg mb-4 placeholder:text-gray-500"
       />
       <button
        type="submit"
        disabled={updatingProfile}
        style={{
         backgroundColor: isDark
          ? colors.dark.primaryBtn
          : colors.light.primaryBtn,
        }}
        className="opacity-85 hover:opacity-100 text-white px-4 py-2 rounded-lg transition duration-200 disabled:opacity-50"
       >
        حفظ الصورة
       </button>
      </form>
      <h2
       style={{
        color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
       }}
       className="text-xl font-bold mb-4"
      >
       تغيير الرمز السري
      </h2>
      <form onSubmit={handlePasswordChange}>
       <input
        type="password"
        placeholder="الرمز السري القديم"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        style={{
         backgroundColor: isDark
          ? colors.dark.primaryBackground
          : colors.light.primaryBackground,
        }}
        className="w-full px-4 py-2  rounded-lg mb-4 placeholder:text-gray-500"
       />
       <input
        type="password"
        placeholder="الرمز السري الجديد"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{
         backgroundColor: isDark
          ? colors.dark.primaryBackground
          : colors.light.primaryBackground,
        }}
        className="w-full px-4 py-2  rounded-lg mb-4 placeholder:text-gray-500"
       />
       <button
        type="submit"
        disabled={updatingProfile}
        style={{
         backgroundColor: isDark
          ? colors.dark.primaryBtn
          : colors.light.primaryBtn,
        }}
        className="opacity-85 hover:opacity-100 text-white px-4 py-2 rounded-lg transition duration-200"
       >
        حفظ الرمز السري الجديد
       </button>
      </form>
      {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
     </div>
    </div>

    {blogs.length > 0 && (
     <div>
      <h1
       style={{
        color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
       }}
       className="text-3xl font-bold mb-6"
      >
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
          style={
           currentPage === i + 1
            ? {
               backgroundColor: isDark
                ? colors.dark.primaryBtn
                : colors.light.primaryBtn,
              }
            : {
               backgroundColor: isDark
                ? colors.dark.grayColor
                : colors.light.grayColor,
              }
          }
          className={`mx-1 px-4 py-2 rounded text-white`}
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
