import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/blog/Loader";
import axios from "axios";
import { apiUrl } from "./Register";
import { useAuth } from "../../context/AuthContext";
import { profilePlaceHolder } from "../../components/blog/BlogCard";
import PageNotFound from "../../components/blog/PageNotFound";
import BackToHome from "../../components/BackToHome";

const User = () => {
 const { username } = useParams();
 const [profileUser, setProfileUser] = useState(null);
 const [loadingUser, setLoadingUser] = useState(true);
 const [deletingUser, setDeletingUser] = useState(false);
 const { currentUser } = useAuth();
 const token = localStorage.getItem("token");
 const navigate = useNavigate();

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
   {" "}
   <div className="bg-white  dark:bg-gray-800/50 m-3 p-6 rounded-lg shadow-md mt-10 max-w-200 mx-auto">
    <div className="flex flex-col items-center space-y-3">
     {/* Profile Picture */}
     <img
      src={profileUser.profilePicture || profilePlaceHolder}
      alt="Profile"
      className={`${
       profileUser?.role === "superAdmin" ? "border-amber-500" : ""
      } w-24 h-24 rounded-full object-cover border-4`}
     />

     {/* Username */}
     <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
      {profileUser.username}
     </h2>
     <h3>{profileUser.email}</h3>

     {/* Role */}
     <div className="mt-5 flex flex-col w-40 gap-2 text-center">
      <h2
       className={`${
        profileUser?.role === "superAdmin" ? "text-amber-400" : ""
       } text-xl`}
      >
       {profileUser?.role}
      </h2>
      {currentUser?.role != "user" && (
       <button
        onClick={() => {
         handleAdmin(profileUser._id);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
       >
        {profileUser.role === "user" ? "اجعل العضو أدمن" : "حذف صلاحية الأدمن"}
       </button>
      )}
      {currentUser?.role === "superAdmin" && (
       <button
        onClick={() => handleDeleteUser(profileUser._id)}
        disabled={deletingUser}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
       >
        حذف العضو
       </button>
      )}
     </div>
    </div>
   </div>
   <BackToHome />
  </>
 );
};

export default User;
