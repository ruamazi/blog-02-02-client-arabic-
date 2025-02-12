import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "./Register";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
 const [profilePicture, setProfilePicture] = useState("");
 const [oldPassword, setOldPassword] = useState("");
 const [newPassword, setNewPassword] = useState("");
 const [message, setMessage] = useState("");
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

 return (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 ">
   <div className="container mx-auto">
    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
     الصفحة الشخصية
    </h1>
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
  </div>
 );
};

export default Profile;
