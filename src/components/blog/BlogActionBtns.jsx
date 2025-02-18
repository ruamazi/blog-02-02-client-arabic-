import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaLockOpen, FaLock } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdPublic } from "react-icons/md";
import { MdPublicOff } from "react-icons/md";

const BlogActionBtns = ({
 blog,
 setShowDeleteBlogModal,
 deletingBlog,
 handleBlockComments,
 handlePrivate,
}) => {
 const navigate = useNavigate();
 return (
  <div className="flex gap-4 w-full my-2 p-2 flex-wrap">
   <button
    disabled={deletingBlog}
    onClick={() => setShowDeleteBlogModal(true)}
    className="flex items-center gap-1 bg-red-400 px-2 hover:bg-red-500 cursor-pointer"
   >
    {deletingBlog ? "جاري الحذف" : "حذف"} <MdDelete size={20} />
   </button>
   <button
    onClick={() => navigate(`/update-blog/${blog._id}`)}
    className="flex items-center gap-1 bg-blue-500 px-2 hover:bg-blue-600 cursor-pointer"
   >
    تعديل <CiEdit size={20} />
   </button>
   <button
    onClick={handleBlockComments}
    className="flex items-center gap-1 bg-gray-500 px-2 hover:bg-gray-600 cursor-pointer"
   >
    {blog.commentsEnabled ? "غلق التعليقات" : "فتح التعليقات"}
    {blog.commentsEnabled ? <FaLockOpen size={18} /> : <FaLock size={18} />}
   </button>
   <button
    onClick={() => handlePrivate(blog._id)}
    className="bg-black px-2 cursor-pointer flex items-center justify-center gap-1"
   >
    {blog.private ? <MdPublicOff /> : <MdPublic />}
    {blog.private ? "منشور خاص" : "منشور عام"}
   </button>
  </div>
 );
};

export default BlogActionBtns;
