import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/blog/Loader";
import axios from "axios";
import { apiUrl } from "./Register";
import { useAuth } from "../../context/AuthContext";
import { profilePlaceHolder } from "../../components/blog/BlogCard";
import PageNotFound from "../../components/blog/PageNotFound";
import BackToHome from "../../components/BackToHome";
import { useTheme } from "../../context/ThemeContext";

const User = () => {
 const { username } = useParams();
 const [profileUser, setProfileUser] = useState(null);
 const [loadingUser, setLoadingUser] = useState(true);
 const [deletingUser, setDeletingUser] = useState(false);
 const { currentUser } = useAuth();
 const token = localStorage.getItem("token");
 const navigate = useNavigate();
 const { colors, darkMode: isDark } = useTheme();

 const getUser = async () => {
  setLoadingUser(true);
  try {
   const resp = await axios.get(`${apiUrl}/api/users/user/${username}`);
   setProfileUser(resp.data);
  } catch (error) {
   console.log(error);
  } finally {
   setLoadingUser(false);
  }
 };

 const handleAdmin = async (userId) => {
  try {
   const resp = await axios.put(
    `${apiUrl}/api/users/change-role/${userId}`,
    {},
    {
     headers: { Authorization: `Bearer ${token}` },
    }
   );
   setProfileUser(resp.data);
  } catch (error) {
   console.log(error);
  }
 };

 const handleDeleteUser = async (userId) => {
  setDeletingUser(true);
  try {
   const resp = await axios.delete(
    `${apiUrl}/api/users/delete-user/${userId}`,

    {
     headers: { Authorization: `Bearer ${token}` },
    }
   );
   console.log(resp.data);
   navigate("/");
  } catch (error) {
   console.log(error);
  } finally {
   setDeletingUser(false);
  }
 };

 useEffect(() => {
  getUser();
 }, [username]);

 if (loadingUser) return <Loader />;
 if (!profileUser) return <PageNotFound />;

 return (
  <>
   <div
    style={{
     backgroundColor: isDark
      ? colors.dark.secondaryBackground
      : colors.light.secondaryBackground,
    }}
    className=" m-3 p-6 rounded-lg shadow-md mt-10 max-w-200 mx-auto"
   >
    <div className="flex flex-col items-center gap-2 ">
     {/* Profile Picture */}
     <img
      src={profileUser.profilePicture || profilePlaceHolder}
      alt="Profile"
      className={`${
       profileUser?.role === "superAdmin" ? "border-amber-500" : ""
      } w-24 h-24 rounded-full object-cover border-4`}
     />

     {/* Username */}
     <h2
      style={{
       color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
      }}
      className="text-2xl font-bold"
     >
      {profileUser.username}
     </h2>
     <h3
      style={{
       color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
      }}
     >
      {profileUser.email}
     </h3>

     {/* Role */}
     <div className="mt-5 flex flex-col w-40 gap-2 text-center min-w-[170px]">
      <h2
       className={`${
        profileUser?.role === "superAdmin" ? "text-amber-500" : ""
       } text-xl`}
      >
       {profileUser?.role}
      </h2>
      {profileUser.role !== "superAdmin" && currentUser?.role != "user" && (
       <button
        onClick={() => {
         handleAdmin(profileUser._id);
        }}
        style={{
         backgroundColor: isDark
          ? colors.dark.primaryBtn
          : colors.light.primaryBtn,
        }}
        className="opacity-85 hover:opacity-100 text-white px-4 py-2 rounded-lg transition duration-200"
       >
        {profileUser.role === "user" ? "اجعل العضو أدمن" : "حذف صلاحية الأدمن"}
       </button>
      )}
      {/* needs to be fixed: add modal confirmation and make sure deleting user wont break website*/}
      {/* {profileUser.role !== "superAdmin" &&
       currentUser?.role === "superAdmin" && (
        <button
         onClick={() => handleDeleteUser(profileUser._id)}
         disabled={deletingUser}
         style={{
          backgroundColor: isDark
           ? colors.dark.primaryBtn
           : colors.light.primaryBtn,
         }}
         className="opacity-85 hover:opacity-100 text-white px-4 py-2 rounded-lg  transition duration-200"
        >
         حذف العضو
        </button>
       )} */}
     </div>
    </div>
   </div>
   <BackToHome />
  </>
 );
};

export default User;
