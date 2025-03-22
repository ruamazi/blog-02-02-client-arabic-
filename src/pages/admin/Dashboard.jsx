import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../pages/blog/Register";
import DashboardStats from "../../components/admin/DashboardStats";
import UsersList from "../../components/admin/UsersList";
import BlogsList from "../../components/admin/BlogsList";
import Loader from "../../components/blog/Loader";
import BackToHome from "../../components/BackToHome";
import { useNavigate } from "react-router-dom";
import WebsiteSettings from "../../components/admin/WebsiteSettings";

const Dashboard = () => {
 const [stats, setStats] = useState(null);
 const [activeTab, setActiveTab] = useState("stats");
 const [loading, setLoading] = useState(true);
 const token = localStorage.getItem("token");
 const navigate = useNavigate();

 useEffect(() => {
  fetchDashboardStats();
 }, []);

 const fetchDashboardStats = async () => {
  if (!token) {
   navigate("/login");
   return;
  }
  try {
   const response = await axios.get(`${apiUrl}/api/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
   });
   setStats(response.data);
  } catch (error) {
   console.error(error);
  } finally {
   setLoading(false);
  }
 };

 if (loading) return <Loader />;

 return (
  <>
   <div className=" md:p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
    <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
     لوحة التحكم
    </h1>

    <div className="mb-4 sm:mb-6">
     <div className="flex flex-wrap gap-2 sm:gap-4">
      <button
       onClick={() => setActiveTab("stats")}
       className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
        activeTab === "stats"
         ? "bg-blue-500 text-white"
         : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
       }`}
      >
       الإحصائيات
      </button>
      <button
       onClick={() => setActiveTab("users")}
       className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
        activeTab === "users"
         ? "bg-blue-500 text-white"
         : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
       }`}
      >
       المستخدمون
      </button>
      <button
       onClick={() => setActiveTab("blogs")}
       className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
        activeTab === "blogs"
         ? "bg-blue-500 text-white"
         : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
       }`}
      >
       المدونات
      </button>
      <button
       onClick={() => setActiveTab("settings")}
       className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
        activeTab === "settings"
         ? "bg-blue-500 text-white"
         : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
       }`}
      >
       اعدادات الموقع
      </button>
     </div>
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
     {activeTab === "stats" && <DashboardStats stats={stats} />}
     {activeTab === "users" && <UsersList />}
     {activeTab === "blogs" && <BlogsList />}
     {activeTab === "settings" && <WebsiteSettings token={token} />}
    </div>
   </div>
   <BackToHome />
  </>
 );
};

export default Dashboard;
