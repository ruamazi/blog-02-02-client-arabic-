import { useState } from "react";
import { MdPublicOff } from "react-icons/md";
import Loader from "./Loader";
import axios from "axios";
import { apiUrl } from "../../pages/blog/Register";

export const profilePlaceHolder =
 "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

const BlogCard = ({ blog, setBlogs, isAdmin }) => {
 const isPending = blog?.status === "pending";
 const [loading, setLoading] = useState(false);
 const token = localStorage.getItem("token");

 const handleApprove = async () => {
  setLoading(true);
  try {
   const resp = await axios.get(
    `${apiUrl}/api/admin/approve-blog/${blog._id}`,
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );
   setBlogs((prev) => prev.map((b) => (b._id === blog._id ? resp.data : b)));
  } catch (error) {
   console.log(error);
  } finally {
   setLoading(false);
  }
 };

 const extractPlainText = (html) => {
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, " ");

  // Extract image URLs
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(html)) !== null) {
   text += ` [Image: ${imgMatch[1]}]`;
  }

  // Extract YouTube URLs
  const youtubeRegex =
   /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/g;
  let youtubeMatch;
  while ((youtubeMatch = youtubeRegex.exec(html)) !== null) {
   text += ` [YouTube: https://youtube.com/watch?v=${youtubeMatch[1]}]`;
  }

  // Extract regular links
  const linkRegex = /<a[^>]+href="([^">]+)"[^>]*>([^<]*)<\/a>/g;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(html)) !== null) {
   text += ` [Link: ${linkMatch[2]} (${linkMatch[1]})]`;
  }

  // Clean up multiple spaces
  text = text.replace(/\s+/g, " ").trim();

  return text;
 };

 if (loading) return <Loader />;

 return (
  <div
   className={`${
    isPending ? "opacity-50" : ""
   } bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden h-full flex flex-col justify-between`}
  >
   <div>
    <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white transition-colors duration-200">
     {blog.title}
    </h2>
    <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-200">
     {extractPlainText(blog.content).substring(0, 100)}...
    </p>
   </div>
   <div className="flex items-center justify-between flex-wrap">
    <div className="flex items-center gap-2">
     <img
      src={blog.author.profilePicture || profilePlaceHolder}
      alt="Author"
      className="w-10 h-10 rounded-full mr-2 object-cover"
     />
     <span className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
      {blog.author.username}
     </span>
    </div>
    {isAdmin && isPending && (
     <button
      onClick={handleApprove}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
     >
      موافقة
     </button>
    )}
    {!isAdmin && isPending && <p className="text-xs">في انتظار الموافقة</p>}
    {blog.private && (
     <MdPublicOff className="text-gray-600 dark:text-gray-400" size={20} />
    )}
   </div>
  </div>
 );
};

export default BlogCard;
