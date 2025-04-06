import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/blog/Loader";
import ConfirmationModal from "../../components/blog/ConfirmationModal";
import Line from "../../components/Line";
import { dateFormatter } from "../../functions/dateFormatter";
import {
 deleteBlog,
 deleteComment,
 fetchBlog,
 likeDislike,
 makeBlogPrivate,
 toggleComments,
} from "../../functions/api";
import BlogAuthor from "../../components/blog/BlogAuthor";
import LikeDislikeButtons from "../../components/blog/LikeDislikeBtns";
import CommentList from "../../components/blog/CommentList";
import CommentForm from "../../components/blog/CommentForm";
import BlogActionBtns from "../../components/blog/BlogActionBtns";
import BackToHome from "../../components/BackToHome";
import RelatedBlogs from "../../components/blog/RelatedBlogs";
import { useTheme } from "../../context/ThemeContext";
import { apiUrl } from "./Register";
import axios from "axios";

const SingleBlog = () => {
 const { id } = useParams();
 const [blog, setBlog] = useState(null);
 const [comment, setComment] = useState("");
 const { currentUser } = useAuth();
 const [deletingBlog, setDeletingBlog] = useState(false);
 const [commenting, setCommenting] = useState(false);
 const [deletingComment, setDeletingComment] = useState(false);
 const [error, setError] = useState("");
 const [commentingError, setCommentingError] = useState("");
 const [showDeleteBlogModal, setShowDeleteBlogModal] = useState(false);
 const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
 const [commentToDelete, setCommentToDelete] = useState(null);
 const [likingLoading, setLikingLoading] = useState(false);
 const [loadingBlog, setLoadingBlog] = useState(false);
 const [privateLoading, setPrivateLoading] = useState(false);
 const [banPeriod, setBanPeriod] = useState("");
 const navigate = useNavigate();
 const { colors, darkMode: isDark } = useTheme();

 useEffect(() => {
  fetchBlogData();
 }, [id, deletingComment]);

 const fetchBlogData = async () => {
  setError("");
  setLoadingBlog(true);
  try {
   const blogData = await fetchBlog(id);
   setBlog(blogData);
  } catch (err) {
   console.log(err);
   setError("المدونة المطلوبة غير موجودة");
  } finally {
   setLoadingBlog(false);
  }
 };

 const handleCommentSubmit = async (e) => {
  e.preventDefault();
  setCommentingError("");
  setBanPeriod("");
  setCommenting(true);
  if (comment === "" || comment.trim() === "") {
   setCommentingError("التعليق لا يمكن ان يكون فارغا");
   return;
  }
  try {
   await axios.post(
    `${apiUrl}/api/comments`,
    { content: comment, blogId: id },
    {
     withCredentials: true,
    }
   );
   setComment("");
   fetchBlogData();
  } catch (err) {
   console.log(err);
   setCommentingError(err.response.data.error || "فشل في إضافة تعليق");
   if (err.response.data.remainingTime) {
    setBanPeriod(err.response.data.remainingTime);
   }
  } finally {
   setCommenting(false);
  }
 };

 const handleDeleteBlog = async () => {
  setDeletingBlog(true);
  try {
   await deleteBlog(blog._id);
   navigate("/");
  } catch (error) {
   console.log(error);
  } finally {
   setDeletingBlog(false);
   setShowDeleteBlogModal(false);
  }
 };

 const handleDeleteComment = async (commentId) => {
  setDeletingComment(true);
  try {
   await deleteComment(commentId);
   fetchBlogData();
  } catch (error) {
   console.log(error);
  } finally {
   setDeletingComment(false);
   setShowDeleteCommentModal(false);
  }
 };

 const handleBlockComments = async () => {
  try {
   const updatedBlog = await toggleComments(blog._id);
   setBlog(updatedBlog);
  } catch (error) {
   console.log(error);
  }
 };

 const handleLikeDislike = async (action) => {
  setLikingLoading(true);
  try {
   const updatedBlog = await likeDislike(action, blog._id);
   setBlog(updatedBlog);
  } catch (error) {
   console.log(error);
  } finally {
   setLikingLoading(false);
  }
 };

 const handlePrivate = async (blogId) => {
  setPrivateLoading(true);
  try {
   const updateBlog = await makeBlogPrivate(blogId);
   setBlog(updateBlog);
  } catch (error) {
   console.log(error);
  } finally {
   setPrivateLoading(false);
  }
 };

 const renderContentWithMedia = (content) => {
  // Regex for plain image URLs (common image extensions)
  const plainImageRegex =
   /(https?:\/\/[^\s"']+\.(?:png|jpg|jpeg|gif|webp|svg|bmp)(?:\?[^\s"']*)?)(?![^<]*>)/gi;
  // Regex for plain YouTube URLs (both watch and youtu.be formats)
  const plainYoutubeRegex =
   /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)(?:\S*)?(?![^<]*>)/gi;
  // First process plain YouTube URLs
  let formattedContent = content.replace(
   plainYoutubeRegex,
   `<div class="my-2"><iframe class="w-full h-[400px] mx-auto max-w-[700px]" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
  );
  // Then process plain image URLs
  formattedContent = formattedContent.replace(
   plainImageRegex,
   `<img class="my-2 w-full h-auto mx-auto max-w-[700px]" src="$1" alt="Blog content"/>`
  );
  // Finally ensure all img tags (existing or newly created) have proper classes
  formattedContent = formattedContent.replace(
   /<img([^>]*)>/g,
   `<img$1 class="my-2 w-full h-auto mx-auto max-w-[700px]" alt="Blog content">`
  );

  return { __html: formattedContent };
 };

 useEffect(() => {
  if (blog && document.title !== blog.title) {
   document.title = blog.title; // Set the title dynamically
  }
 }, [blog]);

 if (loadingBlog) return <Loader />;
 if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
 if (!blog) return null;
 const likedByCurrentUser = blog?.likedBy?.includes(currentUser?._id);
 const dislikedByCurrentUser = blog?.dislikedBy?.includes(currentUser?._id);

 return (
  <>
   <div className="flex items-start justify-center gap-1 flex-col lg:flex-row">
    <div className="flex-3 p-4 w-full max-w-[1200px]">
     <div className="container mx-auto">
      <h1
       style={{
        color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
       }}
       className="text-3xl font-bold mb-2 text-center transition-colors duration-200"
      >
       {blog.title}
      </h1>
      <div
       style={{
        backgroundColor: isDark
         ? colors.dark.secondaryBackground
         : colors.light.secondaryBackground,
       }}
       className="p-6 rounded-lg shadow-md transition-colors duration-200"
      >
       <div
        style={{
         color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
        }}
        className="editor-content text-xl mb-4 tiptap overflow-clip"
        dangerouslySetInnerHTML={renderContentWithMedia(blog.content)}
       />
       <p
        style={{
         color: isDark ? colors.dark.grayColor : colors.light.grayColor,
        }}
        className="text-end opacity-80 transition-colors duration-200"
       >
        {dateFormatter(blog.createdAt)}
       </p>
       <BlogAuthor author={blog.author} />
       {currentUser && (
        <LikeDislikeButtons
         blog={blog}
         likedByCurrentUser={likedByCurrentUser}
         dislikedByCurrentUser={dislikedByCurrentUser}
         handleLikeDislike={handleLikeDislike}
         likingLoading={likingLoading}
        />
       )}
       <div className="flex flex-wrap gap-2">
        {blog?.tags[0] !== "" &&
         blog.tags.map((each, i) => (
          <Link
           key={i}
           to={`/blogs/${each}`}
           style={{
            backgroundColor: isDark
             ? colors.dark.grayColor
             : colors.light.grayColor,
            color: isDark ? colors.dark.primaryColor : colors.dark.primaryColor,
           }}
           className={`opacity-70 px-2 py-1 text-[0.8rem] transition-all duration-200 rounded hover:opacity-100`}
          >
           {each}
          </Link>
         ))}
       </div>
       {currentUser &&
        (currentUser?._id === blog?.author._id ||
         currentUser?.role !== "user") && (
         <BlogActionBtns
          blog={blog}
          setShowDeleteBlogModal={setShowDeleteBlogModal}
          deletingBlog={deletingBlog}
          handleBlockComments={handleBlockComments}
          showDeleteCommentModal={showDeleteBlogModal}
          handlePrivate={handlePrivate}
          privateLoading={privateLoading}
         />
        )}

       <Line />
       <h2
        style={{
         color: isDark
          ? colors.dark.secondaryColor
          : colors.light.secondaryColor,
        }}
        className="text-xl font-bold mb-2 mt-5 transition-all duration-200 "
       >
        التعليقات
       </h2>
       <CommentList
        comments={blog.comments}
        currentUser={currentUser}
        deletingComment={deletingComment}
        setShowDeleteCommentModal={setShowDeleteCommentModal}
        setCommentToDelete={setCommentToDelete}
       />

       {currentUser && blog.commentsEnabled && (
        <CommentForm
         comment={comment}
         setComment={setComment}
         handleCommentSubmit={handleCommentSubmit}
         commenting={commenting}
        />
       )}
       {commentingError && (
        <p className="text-red-500 mt-2 text-center">{commentingError}</p>
       )}
       {banPeriod && (
        <p className="mt-4 text-red-500 text-center">
         مهلة حظرك المتبقي: {banPeriod}
        </p>
       )}
      </div>
     </div>

     <ConfirmationModal
      isOpen={showDeleteBlogModal}
      onClose={() => setShowDeleteBlogModal(false)}
      onConfirm={handleDeleteBlog}
      message="انت على وشك حذف الموضوع, هل أنت متأكد ؟"
     />

     <ConfirmationModal
      isOpen={showDeleteCommentModal}
      onClose={() => setShowDeleteCommentModal(false)}
      onConfirm={() => handleDeleteComment(commentToDelete)}
      message="هل أنت متأكد من حذف التعليق ؟"
     />
    </div>
    {/* Related Blogs */}
    <RelatedBlogs blogId={blog._id} />
   </div>
   <BackToHome />
  </>
 );
};

export default SingleBlog;
