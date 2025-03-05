import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../pages/blog/Register";

const UsersList = () => {
 const [users, setUsers] = useState([]);
 const token = localStorage.getItem("token");

 useEffect(() => {
  fetchUsers();
 }, []);

 const fetchUsers = async () => {
  try {
   const response = await axios.get(`${apiUrl}/api/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
   });
   setUsers(response.data);
  } catch (error) {
   console.error(error);
  }
 };

 const handleRoleUpdate = async (userId) => {
  try {
   await axios.put(
    `${apiUrl}/api/admin/users/${userId}/role`,
    {},
    {
     headers: { Authorization: `Bearer ${token}` },
    }
   );
   fetchUsers();
  } catch (error) {
   console.error(error);
  }
 };

 const handleDeleteUser = async (userId) => {
  if (!window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;

  try {
   await axios.delete(`${apiUrl}/api/admin/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
   });
   fetchUsers();
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
       المستخدم
      </th>
      <th className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 hidden sm:table-cell">
       البريد الإلكتروني
      </th>
      <th className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300">
       الدور
      </th>
      <th className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300">
       الإجراءات
      </th>
     </tr>
    </thead>
    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
     {users.map((user) => (
      <tr key={user._id}>
       <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
        {user.username}
       </td>
       <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 hidden sm:table-cell">
        {user.email}
       </td>
       <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
        {user.role}
       </td>
       <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm">
        <div className="flex flex-col sm:flex-row gap-2">
         <button
          onClick={() => handleRoleUpdate(user._id)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm"
          disabled={user.role === "superAdmin"}
         >
          تغيير الدور
         </button>
         <button
          onClick={() => handleDeleteUser(user._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm"
          disabled={user.role === "superAdmin"}
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

export default UsersList;
