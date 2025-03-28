import React from "react";
import { FaUsers, FaBlog, FaComments } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const DashboardStats = ({ stats }) => {
 const { colors, darkMode: isDark } = useTheme();

 const StatCard = ({ title, value, icon, color }) => (
  <div
   style={{
    backgroundColor: isDark
     ? colors.dark.primaryBackground
     : colors.light.primaryBackground,
   }}
   className=" p-4 sm:p-6 rounded-lg shadow-md"
  >
   <div className="flex items-center gap-4">
    <div className={`p-3 rounded-full ${color[0]} text-white`}>{icon}</div>
    <div className="flex items-center  gap-2.5">
     <h3
      style={{
       color: isDark ? colors.dark.secondaryColor : colors.light.secondaryColor,
      }}
      className="text-lg sm:text-xl font-semibold mb-1"
     >
      {title}
     </h3>
     <p className={`${color[1]} text-2xl sm:text-3xl font-bold`}>{value}</p>
    </div>
   </div>
  </div>
 );

 return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
   <StatCard
    title="المستخدمون"
    value={stats.stats.totalUsers}
    icon={<FaUsers size={24} />}
    color={["bg-blue-500", "text-blue-500"]}
   />
   <StatCard
    title="المدونات"
    value={stats.stats.totalBlogs}
    icon={<FaBlog size={24} />}
    color={["bg-green-500", "text-green-500"]}
   />
   <StatCard
    title="التعليقات"
    value={stats.stats.totalComments}
    icon={<FaComments size={24} />}
    color={["bg-purple-500", "text-purple-500"]}
   />
  </div>
 );
};

export default DashboardStats;
