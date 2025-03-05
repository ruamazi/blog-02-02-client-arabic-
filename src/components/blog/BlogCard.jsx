import React from "react";
import { MdPublicOff } from "react-icons/md";

export const profilePlaceHolder =
 "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

const BlogCard = ({ blog }) => {
 return (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
   <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white transition-colors duration-200">
    {blog.title}
   </h2>
   <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-200">
    {blog.content.substring(0, 100)}...
   </p>
   <div className="flex items-center justify-between">
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
    {blog.private && (
     <MdPublicOff className="text-gray-600 dark:text-gray-400" size={20} />
    )}
   </div>
  </div>
 );
};

export default BlogCard;
