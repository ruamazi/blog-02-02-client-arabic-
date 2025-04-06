import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import Loader from "./Loader";
import StatItem from "./StatItem";
import { dateFormatter } from "../../functions/dateFormatter";
import axios from "axios";
import { apiUrl } from "../../pages/blog/Register";
import { Link } from "react-router-dom";

const UserStats = ({ profileUser, userId }) => {
 const [userStats, setUserStats] = useState();
 const [loadingStats, setLoadingStats] = useState(false);

 const getUserStats = async (id) => {
  if (!id) return;
  setLoadingStats(true);
  try {
   const resp = await axios.get(`${apiUrl}/api/blogs/user-stats/${id}`);
   setUserStats(resp.data);
  } catch (error) {
   console.error("Error fetching user stats:", error);
   setUserStats(null);
  } finally {
   setLoadingStats(false);
  }
 };
 useEffect(() => {
  if (userId) {
   getUserStats(userId);
  }
 }, [userId]);

 const { colors, darkMode: isDark } = useTheme();
 return (
  <div
   style={{
    backgroundColor: isDark
     ? colors.dark.primaryBackground
     : colors.light.primaryBackground,
   }}
   className="flex-1 p-4 rounded-lg shadow-lg "
  >
   <h3
    style={{
     color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
    }}
    className="text-xl font-semibold mb-4 pb-2 border-b border-gray-300 dark:border-gray-600"
   >
    إحصائيات {profileUser.username}
   </h3>
   {loadingStats ? (
    <div className="flex justify-center items-center h-40">
     <Loader size="small" /> {/* Or a text message */}
    </div>
   ) : userStats ? ( // Check if userStats is not null
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
     <StatItem
      label="تاريخ الانضمام"
      value={dateFormatter(profileUser.createdAt)}
     />
     <StatItem
      label="عمر الحساب (أيام)"
      value={userStats.accountAge ?? "N/A"}
     />
     <StatItem label="إجمالي المقالات" value={userStats.totalBlogs ?? 0} />
     <StatItem
      label="المقالات المنشورة"
      value={userStats.publishedBlogs ?? 0}
     />
     <StatItem
      label="مقالات قيد المراجعة"
      value={userStats.pendingBlogs ?? 0}
     />
     <StatItem
      label="إجمالي الإعجابات (على مقالاته)"
      value={userStats.totalLikes ?? 0}
     />
     <StatItem
      label="إجمالي عدم الإعجاب (على مقالاته)"
      value={userStats.totalDislikes ?? 0}
     />
     <StatItem
      label="إجمالي التعليقات (كتبها)"
      value={userStats.totalCommentsMade ?? 0}
     />
     <StatItem
      label="إجمالي المقالات المعجب بها"
      value={userStats.totalBlogsLiked ?? 0}
     />
     {/* Conditional Rendering for specific blog links */}
     {userStats.mostLikedBlog ? (
      <StatItem
       label="المقال الأكثر إعجابًا"
       value={userStats.mostLikedBlog.title}
       isLink={true}
       to={`/blog/${userStats.mostLikedBlog._id}`} // Adjust route as needed
      />
     ) : (
      <StatItem label="المقال الأكثر إعجابًا" value="لا يوجد" />
     )}
     {userStats.mostCommentedBlog ? (
      <StatItem
       label="المقال الأكثر تعليقًا"
       value={userStats.mostCommentedBlog.title}
       isLink={true}
       to={`/blog/${userStats.mostCommentedBlog._id}`} // Adjust route as needed
      />
     ) : (
      <StatItem label="المقال الأكثر تعليقًا" value="لا يوجد" />
     )}

     {/* Calculated Stats */}
     <StatItem
      label="متوسط الإعجابات لكل مقال"
      value={userStats.avgLikesPerBlog?.toFixed(2) ?? "N/A"}
     />
     <StatItem
      label="متوسط التعليقات لكل مقال"
      value={userStats.avgCommentsPerBlog?.toFixed(2) ?? "N/A"}
     />
     <StatItem
      label="معدل التفاعل" // Consider explaining this metric if unclear
      value={userStats.engagementRate?.toFixed(2) ?? "N/A"}
     />

     {/* Top Tags - Spans across two columns if needed */}
     {userStats.topTags && userStats.topTags.length > 0 && (
      <div className="sm:col-span-2 mt-2 pt-2 border-t border-gray-300 dark:border-gray-600">
       <span
        style={{
         color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
        }}
        className="font-semibold"
       >
        {" "}
        الوسوم الأكثر استخداما :
       </span>
       <div className="flex flex-wrap gap-2 mt-1">
        {userStats.topTags.map((tag) => (
         <Link
          to={`/blogs/${tag}`}
          key={tag}
          style={{
           backgroundColor: isDark
            ? colors.dark.secondaryBackground
            : colors.light.secondaryBackground,
          }}
          className="text-xs px-2 py-1 rounded-lg"
         >
          {tag}
         </Link>
        ))}
       </div>
      </div>
     )}
    </div>
   ) : (
    <p className="text-center text-red-500 py-10">
     لم يتم العثور على إحصائيات لهذا المستخدم.
    </p>
   )}
  </div>
 );
};

export default UserStats;
