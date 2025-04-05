import { useState } from "react";
import axios from "axios";
import { VscLock, VscUnlock } from "react-icons/vsc";
import { FaRegEdit } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { apiUrl } from "../../pages/blog/Register";

const UserBan = ({ profileUser, currentUser, onBanUpdate }) => {
 const { colors, darkMode: isDark } = useTheme();
 const [editing, setEditing] = useState({
  canPublish: false,
  canComment: false,
  canChangePicture: false,
 });
 const [banReasons, setBanReasons] = useState({
  canPublish: profileUser.canPublish.reason,
  canComment: profileUser.canComment.reason,
  canChangePicture: profileUser.canChangePicture.reason,
 });
 const [isUpdating, setIsUpdating] = useState(false);

 // Check if current user has permission to modify bans
 const canModifyBans =
  currentUser?.role === "superAdmin" ||
  (currentUser?.role === "admin" && profileUser.role === "user");

 const handleBanToggle = async (banType) => {
  console.log(banType);
  if (!canModifyBans) return;
  setIsUpdating(true);
  try {
   const newStatus = !profileUser[banType].status;
   const updateData = {
    [banType]: {
     status: newStatus,
     reason: banReasons[banType] || "",
     date: newStatus ? null : new Date(), // Set ban date only when restricting
    },
   };
   const resp = await axios.put(
    `${apiUrl}/api/users/update-ban/${profileUser._id}`,
    updateData,
    { withCredentials: true }
   );
   onBanUpdate(resp.data); // Update parent component with new user data
   setEditing({ ...editing, [banType]: false }); // Exit edit mode
  } catch (error) {
   console.error(`Error updating ${banType} ban:`, error);
  } finally {
   setIsUpdating(false);
  }
 };

 const handleReasonChange = (banType, value) => {
  setBanReasons({ ...banReasons, [banType]: value });
 };

 const toggleEdit = (banType) => {
  setEditing({ ...editing, [banType]: !editing[banType] });
 };

 const renderBanControl = (banType, label) => {
  const isBanned = !profileUser[banType].status;
  const banDate = profileUser[banType].date
   ? new Date(profileUser[banType].date).toLocaleDateString()
   : null;

  return (
   <div
    className={`p-3 rounded-lg mb-3 `}
    style={{
     borderLeft: `4px solid ${
      isBanned
       ? isDark
         ? colors.dark.tertiaryBtn
         : colors.light.tertiaryBtn
       : isDark
       ? colors.dark.secondaryBtn
       : colors.light.secondaryBtn
     }`,
     backgroundColor: isDark
      ? colors.dark.primaryBackground
      : colors.light.primaryBackground,
    }}
   >
    <div className="flex justify-between items-center w-full gap-1">
     <div className="flex items-center gap-2">
      {isBanned ? (
       <VscLock
        className={`${isDark ? "text-red-400" : "text-red-600"}`}
        size={18}
       />
      ) : (
       <VscUnlock
        className={`${isDark ? "text-green-400" : "text-green-600"}`}
        size={18}
       />
      )}
      <span className="font-medium">{label}</span>
     </div>

     {canModifyBans && (
      <button
       onClick={() => handleBanToggle(banType)}
       disabled={isUpdating}
       className={`px-3 py-1 rounded text-sm ${
        isBanned
         ? `${
            isDark
             ? "bg-green-700 hover:bg-green-600"
             : "bg-green-600 hover:bg-green-500"
           } text-white`
         : `${
            isDark
             ? "bg-red-700 hover:bg-red-600"
             : "bg-red-600 hover:bg-red-500"
           } text-white`
       }`}
      >
       {isUpdating ? "جاري التحديث..." : isBanned ? "رفع الحظر" : "حظر"}
      </button>
     )}
    </div>

    {(isBanned || editing[banType]) && (
     <div className="mt-2">
      {editing[banType] ? (
       <div className="flex gap-2">
        <input
         type="text"
         value={banReasons[banType]}
         onChange={(e) => handleReasonChange(banType, e.target.value)}
         placeholder="سبب الحظر (اختياري)"
         className={`flex-1 p-2 rounded text-sm ${
          isDark ? "bg-gray-700 text-white" : "bg-white text-gray-800"
         }`}
        />
        <button
         onClick={() => toggleEdit(banType)}
         className="px-2 py-1 bg-gray-500 text-white rounded text-sm"
        >
         حفظ
        </button>
       </div>
      ) : (
       <div className="flex justify-between items-center text-sm mt-1">
        <div>
         <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {profileUser[banType].reason || "لا يوجد سبب محدد"}
         </span>
         {banDate && (
          <span
           className={`block text-xs ${
            isDark ? "text-gray-500" : "text-gray-400"
           }`}
          >
           منذ: {banDate}
          </span>
         )}
        </div>
        {canModifyBans && (
         <button
          onClick={() => toggleEdit(banType)}
          className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
         >
          <FaRegEdit size={14} />
         </button>
        )}
       </div>
      )}
     </div>
    )}
   </div>
  );
 };

 if (
  !canModifyBans &&
  profileUser.canPublish.status &&
  profileUser.canComment.status &&
  profileUser.canChangePicture.status
 ) {
  return null; // Don't show if no restrictions and no permission to modify
 }

 return (
  <div
   className={`m-3 p-2 md:p-6 rounded-lg shadow-md ${
    isDark ? "bg-gray-800" : "bg-white"
   } border w-[100%]`}
   style={{
    borderTop: `3px solid ${
     isDark ? colors.dark.tertiaryBtn : colors.light.tertiaryBtn
    }`,
   }}
  >
   <h3
    className={`text-lg font-bold mb-4 ${
     isDark ? "text-red-300" : "text-red-600"
    }`}
   >
    إعدادات القيود
   </h3>

   {renderBanControl("canPublish", "النشر")}
   {renderBanControl("canComment", "التعليق")}
   {renderBanControl("canChangePicture", "الصورة الشخصية")}

   <p className={`text-xs mt-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
    ملاحظة: هذه القيود تؤثر فقط على إمكانيات المستخدم ولا تمنع تسجيل الدخول.
   </p>
  </div>
 );
};

export default UserBan;
