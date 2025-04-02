import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"; // Import Link
import Loader from "../../components/blog/Loader";
import axios from "axios";
import { apiUrl } from "./Register";
import { useAuth } from "../../context/AuthContext";
import { profilePlaceHolder } from "../../components/blog/BlogCard";
import PageNotFound from "../../components/blog/PageNotFound";
import BackToHome from "../../components/BackToHome";
import { useTheme } from "../../context/ThemeContext";
import UserBlogs from "../../components/blog/UserBlogs";
import UserStats from "../../components/blog/UserStats";
import { VscVerifiedFilled, VscUnverified } from "react-icons/vsc";

const User = () => {
 const { username } = useParams();
 const [profileUser, setProfileUser] = useState(null);
 const [loadingUser, setLoadingUser] = useState(true);
 const [deletingUser, setDeletingUser] = useState(false);
 const { currentUser } = useAuth();
 const navigate = useNavigate();
 const { colors, darkMode: isDark } = useTheme();

 // Fetch user profile data
 const getUser = async () => {
  setLoadingUser(true);
  setProfileUser(null); // Reset user on username change
  try {
   const resp = await axios.get(`${apiUrl}/api/users/user/${username}`);
   setProfileUser(resp.data);
  } catch (error) {
   console.error("Error fetching user profile:", error);
   setProfileUser(null); // Ensure profileUser is null on error
  } finally {
   setLoadingUser(false);
  }
 };

 // Handle making user admin/removing admin role
 const handleAdmin = async (userId) => {
  try {
   const resp = await axios.put(
    `${apiUrl}/api/users/change-role/${userId}`,
    {},
    {
     withCredentials: true,
    }
   );
   setProfileUser(resp.data); // Update profileUser state with new role
  } catch (error) {
   console.error("Error changing user role:", error);
  }
 };

 // Handle deleting a user
 const handleDeleteUser = async (userId) => {
  // Implement confirmation modal here before proceeding
  if (
   window.confirm(
    `هل أنت متأكد أنك تريد حذف المستخدم ${profileUser?.username}؟ لا يمكن التراجع عن هذا الإجراء.`
   )
  ) {
   setDeletingUser(true);
   try {
    await axios.delete(`${apiUrl}/api/users/delete-user/${userId}`, {
     withCredentials: true,
    });
    navigate("/"); // Navigate away after deletion
   } catch (error) {
    console.error("Error deleting user:", error);
    // Add user feedback here (e.g., toast notification)
   } finally {
    setDeletingUser(false);
   }
  }
 };

 // Effect to fetch user profile when username changes
 useEffect(() => {
  getUser();
 }, [username]);

 if (loadingUser) return <Loader />;
 // If loading finished but no profileUser found (e.g., 404 error)
 if (!profileUser) return <PageNotFound />;

 return (
  <>
   <div
    style={{
     backgroundColor: isDark
      ? colors.dark.secondaryBackground
      : colors.light.secondaryBackground,
     color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
    }}
    className="m-3 p-4 md:p-6 rounded-lg shadow-md mt-10 max-w-4xl mx-auto"
   >
    <div className="flex flex-col md:flex-row gap-6 ">
     {/* Left Side: Profile Info & Actions */}
     <div className="flex flex-col items-center justify-center md:items-start md:w-1/3 ">
      {/* Profile Picture */}
      <img
       src={profileUser.profilePicture || profilePlaceHolder}
       alt={`${profileUser.username}'s Profile`}
       className={`w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 mb-3 ${
        profileUser?.role === "superAdmin"
         ? "border-amber-500"
         : isDark
         ? "border-gray-600"
         : "border-gray-300" // Consistent border
       }`}
      />

      {/* Username */}
      <h2 className="text-2xl font-bold mt-2 text-center md:text-left">
       {profileUser.username}
      </h2>
      {/* Email */}
      <h3
       style={{
        color: isDark ? colors.dark.grayColor : colors.light.grayColor,
       }}
       className="flex gap-1 text-sm mb-3 text-center md:text-left"
      >
       {profileUser.email}
       {profileUser.emailVerified ? (
        <VscVerifiedFilled
         style={{
          color: isDark ? colors.dark.secondaryBtn : colors.light.secondaryBtn,
         }}
         className="text-green-500 opacity-70 mb-1"
        />
       ) : (
        <VscUnverified
         style={{
          color: isDark ? colors.dark.tertiaryBtn : colors.light.tertiaryBtn,
         }}
         size={18}
         className="text-red-500 opacity-70 mb-1"
        />
       )}
      </h3>

      {/* Role & Admin Actions */}
      <div className="mt-2 flex flex-col w-full max-w-[200px] items-center md:items-start gap-2 text-center md:text-left">
       <span
        className={`text-lg font-semibold px-3 py-1 rounded ${
         profileUser?.role === "superAdmin"
          ? "text-amber-500 bg-amber-100 dark:bg-amber-900/50"
          : profileUser?.role === "admin"
          ? "text-blue-500 bg-blue-100 dark:bg-blue-900/50"
          : "text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
        }`}
       >
        {profileUser?.role}
       </span>
       {/* Change Role Button */}
       {profileUser.role !== "superAdmin" &&
        currentUser?.role === "superAdmin" && ( // Only SuperAdmin can change roles
         <button
          onClick={() => handleAdmin(profileUser._id)}
          style={{
           backgroundColor: isDark
            ? colors.dark.primaryBtn
            : colors.light.primaryBtn,
          }}
          className="opacity-90 hover:opacity-100 w-full px-4 py-2 mt-2 rounded-lg transition duration-200 text-sm"
         >
          {profileUser.role === "user"
           ? "اجعل العضو أدمن"
           : "حذف صلاحية الأدمن"}
         </button>
        )}
       {/* Delete User Button */}
       {profileUser.role !== "superAdmin" &&
        currentUser?.role === "superAdmin" && (
         <button
          onClick={() => handleDeleteUser(profileUser._id)}
          disabled={deletingUser}
          style={{
           backgroundColor: isDark
            ? colors.dark.tertiaryBtn
            : colors.light.tertiaryBtn,
          }}
          className="opacity-90 hover:opacity-100 disabled:opacity-50 w-full text-white px-4 py-2 rounded-lg transition duration-200 text-sm"
         >
          {deletingUser ? "جاري الحذف..." : "حذف العضو"}
         </button>
        )}
      </div>
     </div>

     {/* Right Side: User Stats */}
     <UserStats profileUser={profileUser} userId={profileUser._id} />
    </div>
   </div>

   {/* User Blogs Section (Unchanged) */}
   {profileUser?._id && (
    <UserBlogs userId={profileUser._id} username={profileUser.username} />
   )}
   <BackToHome />
  </>
 );
};

export default User;
