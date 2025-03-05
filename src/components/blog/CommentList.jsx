import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { profilePlaceHolder } from "./BlogCard";

const CommentList = ({
 comments,
 currentUser,
 deletingComment,
 setShowDeleteCommentModal,
 setCommentToDelete,
}) => {
 return (
  <div>
   {comments.map((comment) => (
    <div
     key={comment._id}
     className="m-2 bg-blue-100 dark:bg-black/30 p-2 rounded-xl shadow max-w-4xl mx-auto"
    >
     <Link
      to={`/user/${comment.author?.username}`}
      className="flex items-center mb-3 bg-black/30 w-fit px-2 py-[2px] rounded-xl gap-2 hover:bg-black/70"
     >
      <img
       src={comment.author?.profilePicture || profilePlaceHolder}
       alt="Author"
       className="w-8 h-8 rounded-full mr-2 object-cover"
      />
      <span className="text-white dark:text-gray-400">
       {comment.author?.username}
      </span>
     </Link>
     <div className="flex items-center justify-between">
      <p className="text-gray-700 dark:text-white ml-10 font-semibold">
       {comment.content}
      </p>

      {currentUser &&
       (currentUser?._id === comment.author._id ||
        currentUser?.role !== "user") && (
        <button
         onClick={() => {
          setCommentToDelete(comment._id);
          setShowDeleteCommentModal(true);
         }}
         disabled={deletingComment}
         className="cursor-pointer text-red-400 hover:text-red-500 hover:bg-white/60 dark:hover:bg-white/20 p-1 rounded-full transition-colors duration-200"
        >
         <MdOutlineDeleteOutline size={20} />
        </button>
       )}
     </div>
    </div>
   ))}
  </div>
 );
};

export default CommentList;
