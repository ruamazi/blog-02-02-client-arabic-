import {
 AiFillLike,
 AiFillDislike,
 AiOutlineDislike,
 AiOutlineLike,
} from "react-icons/ai";

const LikeDislikeButtons = ({
 blog,
 likedByCurrentUser,
 dislikedByCurrentUser,
 handleLikeDislike,
 likingLoading,
}) => {
 return (
  <div className="flex items-center justify-center gap-4 w-fit my-4">
   <button
    onClick={() => handleLikeDislike("like")}
    className=" relative cursor-pointer hover:text-blue-400"
    disabled={likingLoading}
   >
    {blog.likedBy.length > 0 && (
     <span className="text-[0.7rem] font-bold absolute right-[-1px] top-[-8px]">
      {blog.likedBy.length}
     </span>
    )}
    {likedByCurrentUser ? (
     <AiFillLike className="text-blue-400" size={24} />
    ) : (
     <AiOutlineLike size={24} />
    )}
   </button>
   <button
    onClick={() => handleLikeDislike("dislike")}
    className=" relative cursor-pointer hover:text-red-400"
    disabled={likingLoading}
   >
    {blog.dislikedBy.length > 0 && (
     <span className="text-[0.7rem] font-bold absolute left-[-3px] bottom-[-10px]">
      {blog.dislikedBy.length}
     </span>
    )}
    {dislikedByCurrentUser ? (
     <AiFillDislike className="text-red-400" size={24} />
    ) : (
     <AiOutlineDislike size={24} />
    )}
   </button>
  </div>
 );
};

export default LikeDislikeButtons;
