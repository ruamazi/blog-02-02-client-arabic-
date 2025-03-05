import React, { useState, useEffect } from "react";
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
 postComment,
 toggleComments,
} from "../../functions/api";
import BlogAuthor from "../../components/blog/BlogAuthor";
import LikeDislikeButtons from "../../components/blog/LikeDislikeBtns";
import CommentList from "../../components/blog/CommentList";
import CommentForm from "../../components/blog/CommentForm";
import BlogActionBtns from "../../components/blog/BlogActionBtns";

const SingleBlog = () => {
 const { id } = useParams();
 const [blog, setBlog] = useState(null);
 const [comment, setComment] = useState("");
 const { currentUser } = useAuth();
 const [deletingBlog, setDeletingBlog] = useState(false);
 const [commenting, setCommenting] = useState(false);
 const [deletingComment, setDeletingComment] = useState(false);
 const [error, setError] = useState("");
 const [showDeleteBlogModal, setShowDeleteBlogModal] = useState(false);
 const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
 const [commentToDelete, setCommentToDelete] = useState(null);
 const [likingLoading, setLikingLoading] = useState(false);
 const navigate = useNavigate();

 useEffect(() => {
  fetchBlogData();
 }, [id, deletingComment]);

 const fetchBlogData = async () => {
  try {
   const blogData = await fetchBlog(id);
   setBlog(blogData);
  } catch (err) {
   setError("Failed to fetch blog");
  }
 };

 const handleCommentSubmit = async (e) => {
  e.preventDefault();
  setCommenting(true);
  try {
   await postComment(comment, id);
   setComment("");
   fetchBlogData();
  } catch (err) {
   setError("Failed to post comment");
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
  try {
   const updateBlog = await makeBlogPrivate(blogId);
   setBlog(updateBlog);
  } catch (error) {
   console.log(error);
  }
 };

 const renderContentWithMedia = (content) => {
  const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
  const youtubeRegex =
   /(https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+))/i;

  return content.split(/\s+/).map((word, index) => {
   if (imageRegex.test(word)) {
    return (
     <img
      key={index}
      src={word}
      alt="Blog content"
      className="my-2 max-w-full h-auto mx-auto"
     />
    );
   } else if (youtubeRegex.test(word)) {
    const match = word.match(youtubeRegex);
    const videoId = match[2];
    return (
     <div key={index} className="my-2">
      <iframe
       className="w-full max-w-[650px] h-[350px] mx-auto"
       src={`https://www.youtube.com/embed/${videoId}`}
       title="YouTube video player"
       frameBorder="0"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
       allowFullScreen
      ></iframe>
     </div>
    );
   } else {
    return <span key={index}>{word} </span>;
   }
  });
 };

 const likedByCurrentUser = blog?.likedBy?.includes(currentUser?._id);
 const dislikedByCurrentUser = blog?.dislikedBy?.includes(currentUser?._id);

 if (!blog) return <Loader />;

 return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-200">
   <div className="container mx-auto">
    <h1 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white transition-colors duration-200">
     {blog.title}
    </h1>
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
     <p className="text-gray-700 dark:text-gray-300 text-xl mb-4 transition-colors duration-200">
      {renderContentWithMedia(blog.content)}
     </p>
     <p className="text-end text-gray-600 dark:text-gray-400 transition-colors duration-200">
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
     {blog?.tags[0] != "" &&
      blog.tags.map((each, i) => (
       <Link
        to={`/blogs/${each}`}
        key={i}
        className="mr-2 bg-slate-300 dark:bg-slate-500 px-2 py-1 text-[0.8rem]"
       >
        {each}
       </Link>
      ))}
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
       />
      )}

     <Line />
     <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white mt-5">
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
 );
};

export default SingleBlog;
