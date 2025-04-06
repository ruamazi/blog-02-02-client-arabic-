import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";

const CommentList = ({
 comments,
 currentUser,
 deletingComment,
 setShowDeleteCommentModal,
 setCommentToDelete,
}) => {
 const { colors, darkMode: isDark } = useTheme();

 return (
  <div>
   {comments.map((comment) => (
    <div
     key={comment._id}
     style={{
      backgroundColor: isDark
       ? colors.dark.tertiaryBackground
       : colors.light.tertiaryBackground,
     }}
     className="m-2 p-2 rounded-xl shadow max-w-4xl mx-auto"
    >
     <Link
      to={`/user/${comment.author?.username}`}
      style={{
       backgroundColor: isDark ? colors.dark.grayColor : colors.light.grayColor,
      }}
      className="flex items-center mb-3 w-fit px-2 py-[2px] rounded-xl gap-2 opacity-70 hover:opacity-90 transition-all duration-200"
     >
      <img
       src={comment.author?.profilePicture}
       alt="Author"
       className="w-8 h-8 rounded-full mr-2 object-cover"
      />
      <span className="text-white">{comment.author?.username}</span>
     </Link>
     <div className="flex items-center justify-between">
      <p
       style={{
        color: isDark
         ? colors.dark.secondaryColor
         : colors.light.secondaryColor,
       }}
       className=" ml-10 font-semibold"
      >
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
         style={{
          color: isDark ? colors.dark.tertiaryBtn : colors.light.tertiaryBtn,
         }}
         className="cursor-pointer opacity-70 hover:opacity-85 hover:bg-white/60 dark:hover:bg-white/20 p-1 rounded-full transition-all duration-200"
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
