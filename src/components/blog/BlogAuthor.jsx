import React from "react";
import { Link } from "react-router-dom";
import { profilePlaceHolder } from "./BlogCard";

const BlogAuthor = ({ author }) => {
 return (
  <Link
   to={`/user/${author.username}`}
   className="flex items-center mb-6 gap-2 bg-black/30 w-fit py-2 px-3 rounded-xl hover:bg-black/70"
  >
   <img
    src={author.profilePicture || profilePlaceHolder}
    alt="Author"
    className="w-10 h-10 rounded-full mr-2 object-cover"
   />
   <span className="text-gray-700 dark:text-gray-400">{author.username}</span>
  </Link>
 );
};

export default BlogAuthor;
