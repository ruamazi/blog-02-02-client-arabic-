import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaLockOpen, FaLock } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdPublic } from "react-icons/md";
import { MdPublicOff } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";

const BlogActionBtns = ({
 blog,
 setShowDeleteBlogModal,
 deletingBlog,
 handleBlockComments,
 handlePrivate,
}) => {
 const navigate = useNavigate();
 const { colors, darkMode: isDark } = useTheme();

 return (
  <div className="flex gap-4 w-full my-2 p-2 flex-wrap">
   <button
    disabled={deletingBlog}
    onClick={() => setShowDeleteBlogModal(true)}
    style={{
     backgroundColor: isDark
      ? colors.dark.tertiaryBtn
      : colors.light.tertiaryBtn,
    }}
    className="flex items-center gap-1 text-white py-1 px-2 md:px-4 text-xs md:text-sm md:py-2 rounded"
   >
    {deletingBlog ? "جاري الحذف" : "حذف"} <MdDelete size={20} />
   </button>
   <button
    onClick={() => navigate(`/update-blog/${blog._id}`)}
    style={{
     backgroundColor: isDark ? colors.dark.primaryBtn : colors.light.primaryBtn,
    }}
    className="flex items-center gap-1 text-white py-1 px-2 md:px-4 text-xs md:text-sm md:py-2 rounded"
   >
    تعديل <CiEdit size={20} />
   </button>
   <button
    onClick={handleBlockComments}
    style={{
     backgroundColor: isDark ? colors.dark.grayColor : colors.light.grayColor,
    }}
    className="flex items-center gap-1 text-white py-1 px-2 md:px-4 text-xs md:text-sm md:py-2 rounded"
   >
    {blog.commentsEnabled ? "غلق التعليقات" : "فتح التعليقات"}
    {blog.commentsEnabled ? <FaLockOpen size={18} /> : <FaLock size={18} />}
   </button>
   <button
    onClick={() => handlePrivate(blog._id)}
    style={{
     backgroundColor: isDark
      ? colors.dark.primaryBackground
      : colors.light.primaryBackground,
     color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
    }}
    className="flex items-center gap-1 text-white py-1 px-2 md:px-4 text-xs md:text-sm md:py-2 rounded"
   >
    {blog.private ? <MdPublicOff /> : <MdPublic />}
    {blog.private ? "منشور خاص" : "منشور عام"}
   </button>
  </div>
 );
};

export default BlogActionBtns;
