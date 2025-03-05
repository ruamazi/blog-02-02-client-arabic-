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
    className="flex items-center gap-1 bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200"
   >
    {deletingBlog ? "جاري الحذف" : "حذف"} <MdDelete size={20} />
   </button>
   <button
    onClick={() => navigate(`/update-blog/${blog._id}`)}
    className="flex items-center gap-1 bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
   >
    تعديل <CiEdit size={20} />
   </button>
   <button
    onClick={handleBlockComments}
    className="flex items-center gap-1 bg-gray-500 dark:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
   >
    {blog.commentsEnabled ? "غلق التعليقات" : "فتح التعليقات"}
    {blog.commentsEnabled ? <FaLockOpen size={18} /> : <FaLock size={18} />}
   </button>
   <button
    onClick={() => handlePrivate(blog._id)}
    className="flex items-center gap-1 bg-black dark:bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 dark:hover:bg-gray-700 transition-colors duration-200"
   >
    {blog.private ? <MdPublicOff /> : <MdPublic />}
    {blog.private ? "منشور خاص" : "منشور عام"}
   </button>
  </div>
 );
};

export default BlogActionBtns;
