import React from "react";
import { Link } from "react-router-dom";
import { profilePlaceHolder } from "./BlogCard";
import { useTheme } from "../../context/ThemeContext";

const BlogAuthor = ({ author }) => {
 const { colors, darkMode: isDark } = useTheme();

 return (
  <Link
   to={`/user/${author.username}`}
   style={{
    backgroundColor: isDark ? colors.dark.grayColor : colors.light.grayColor,
   }}
   className="flex items-center mb-6 gap-2 w-fit py-[3px] px-3 rounded-xl opacity-70 hover:opacity-90 
   transition-all duration-200"
  >
   <img
    src={author.profilePicture || profilePlaceHolder}
    alt="Author"
    className="w-10 h-10 rounded-full mr-2 object-cover border-white border-2"
   />
   <span className="text-white">{author.username}</span>
  </Link>
 );
};

export default BlogAuthor;
