import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../pages/blog/Register";
import Loader from "../blog/Loader";
import { useTheme } from "../../context/ThemeContext";
import ConfirmationModal from "../blog/ConfirmationModal";
import { useAuth } from "../../context/AuthContext";

const UsersList = ({ currentUserRole, canAdminDeleteUser }) => {
 const [users, setUsers] = useState([]);
 const [loodingUsers, setLoodingUsers] = useState(true);
 const [error, setError] = useState(null);
 const [deletingUser, setDeletingUser] = useState(false);
 const [updatingUserRole, setUpdatingUserRole] = useState(false);
 const [showModal, setShowModal] = useState({
  status: false,
  userId: null,
 });
 const { colors, darkMode: isDark } = useTheme();

 useEffect(() => {
  fetchUsers();
 }, []);

 const fetchUsers = async () => {
  setError(null);
  setLoodingUsers(true);
  try {
   const response = await axios.get(`${apiUrl}/api/admin/users`, {
    withCredentials: true,
   });
   setUsers(response.data);
  } catch (error) {
   console.error(error);
   setError("حدث خطأ أثناء جلب المستخدمين");
  } finally {
   setLoodingUsers(false);
  }
 };

 const handleRoleUpdate = async (userId) => {
  setUpdatingUserRole(true);
  try {
   await axios.put(
    `${apiUrl}/api/admin/users/${userId}/role`,
    {},
    {
     withCredentials: true,
    }
   );
   fetchUsers();
  } catch (error) {
   console.error(error);
  } finally {
   setUpdatingUserRole(false);
  }
 };

 const handleDeleteUser = async (userId) => {
  setDeletingUser(true);
  try {
   await axios.delete(`${apiUrl}/api/users/delete-user/${userId}`, {
    withCredentials: true,
   });
   fetchUsers();
  } catch (error) {
   console.error(error);
  } finally {
   setDeletingUser(false);
   setShowModal({ status: false, userId: null });
  }
 };

 if (loodingUsers) return <Loader />;
 if (error) return <p className="text-center py-6 text-red-600">{error}</p>;
 if (users.length === 0)
  return <p className="text-center py-6">لا يوجد مستخدمين</p>;

 return (
  <div className="overflow-x-auto">
   <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
       المستخدم
      </th>
      <th className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium hidden sm:table-cell">
       البريد الإلكتروني
      </th>
      <th className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium">
       الدور
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
     {users.map((user) => (
      <tr
       key={user._id}
       style={{
        color: isDark
         ? colors.dark.secondaryColor
         : colors.light.secondaryColor,
       }}
      >
       <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm">
        {user.username}
       </td>
       <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm hidden sm:table-cell">
        {user.email}
       </td>
       <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm">
        {user.role}
       </td>
       <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm">
        <div className="flex flex-col sm:flex-row gap-2">
         <button
          onClick={() => handleRoleUpdate(user._id)}
          style={{
           backgroundColor: isDark
            ? colors.dark.primaryBtn
            : colors.light.primaryBtn,
          }}
          className="opacity-90 hover:opacity-100 transition-all duration-200 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm  btndisabled"
          disabled={user.role === "superAdmin" || updatingUserRole}
         >
          {updatingUserRole ? "جاري التحديث" : "تعديل الدور"}
         </button>
         {currentUserRole === "admin" && !canAdminDeleteUser ? null : (
          <button
           onClick={() => setShowModal({ status: true, userId: user._id })}
           style={{
            backgroundColor: isDark
             ? colors.dark.tertiaryBtn
             : colors.light.tertiaryBtn,
           }}
           className="opacity-90 hover:opacity-100 transition-all duration-200 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm btndisabled"
           disabled={user.role === "superAdmin" || deletingUser}
          >
           {deletingUser ? "جاري الحذف" : "حذف"}
          </button>
         )}
        </div>
       </td>
      </tr>
     ))}
    </tbody>
   </table>
   <ConfirmationModal
    isOpen={showModal.status}
    onClose={() => setShowModal(false)}
    onConfirm={() => handleDeleteUser(showModal.userId)}
    message="هل أنت متأكد من حذف هذا المستخدم؟"
   />
  </div>
 );
};

export default UsersList;
