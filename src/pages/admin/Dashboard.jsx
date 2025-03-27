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
import { useTheme } from "../../context/ThemeContext";

const Dashboard = () => {
 const [stats, setStats] = useState(null);
 const [activeTab, setActiveTab] = useState("stats");
 const [loading, setLoading] = useState(true);
 const token = localStorage.getItem("token");
 const navigate = useNavigate();
 const { colors, darkMode: isDark } = useTheme();

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
   <div
    style={{
     backgroundColor: isDark
      ? colors.dark.primaryBackground
      : colors.light.primaryBackground,
    }}
    className=" md:p-4 sm:p-6 min-h-screen"
   >
    <h1
     style={{
      color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
     }}
     className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
    >
     لوحة التحكم
    </h1>

    <div className="mb-4 sm:mb-6">
     <div className="flex flex-wrap gap-2 sm:gap-4">
      <button
       onClick={() => setActiveTab("stats")}
       style={{
        backgroundColor:
         activeTab === "stats" ? colors.dark.primaryBtn : colors.dark.grayColor,
       }}
       className={`${
        activeTab !== "stats" && "opacity-80"
       } hover:opacity-100 px-3 text-white py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base`}
      >
       الإحصائيات
      </button>
      <button
       onClick={() => setActiveTab("users")}
       style={{
        backgroundColor:
         activeTab === "users" ? colors.dark.primaryBtn : colors.dark.grayColor,
       }}
       className={`${
        activeTab !== "users" && "opacity-80"
       } hover:opacity-100 px-3 text-white py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base`}
      >
       المستخدمون
      </button>
      <button
       onClick={() => setActiveTab("blogs")}
       style={{
        backgroundColor:
         activeTab === "blogs" ? colors.dark.primaryBtn : colors.dark.grayColor,
       }}
       className={`${
        activeTab !== "blogs" && "opacity-80"
       } hover:opacity-100 px-3 text-white py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base`}
      >
       المدونات
      </button>
      <button
       onClick={() => setActiveTab("settings")}
       style={{
        backgroundColor:
         activeTab === "settings"
          ? colors.dark.primaryBtn
          : colors.dark.grayColor,
       }}
       className={`${
        activeTab !== "settings" && "opacity-80"
       } hover:opacity-100 px-3 text-white py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base`}
      >
       اعدادات الموقع
      </button>
     </div>
    </div>

    <div
     style={{
      backgroundColor: isDark
       ? colors.dark.secondaryBackground
       : colors.light.secondaryBackground,
     }}
     className="rounded-lg shadow-md p-4 sm:p-6"
    >
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
