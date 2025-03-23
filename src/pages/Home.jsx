import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BlogCard from "../components/blog/BlogCard";
import { apiUrl } from "./blog/Register";
import Loader from "../components/blog/Loader";
import MostUsedTags from "../components/blog/MostUsedTags";
import { useAuth } from "../context/AuthContext";

const Home = () => {
 const [blogs, setBlogs] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);
 const [isLoading, setIsLoading] = useState(false);
 const { currentUser } = useAuth();
 const token = localStorage.getItem("token");

 useEffect(() => {
  fetchBlogs();
 }, [currentPage]);

 const isAdmin =
  currentUser?.role === "admin" || currentUser?.role === "superAdmin";

 const fetchBlogs = async () => {
  setIsLoading(true);
  try {
   if (isAdmin) {
    const resp = await axios.get(
     `${apiUrl}/api/admin/all-blogs?page=${currentPage}&limit=10`,
     {
      headers: {
       Authorization: `Bearer ${token}`,
      },
     }
    );
    setBlogs(resp.data.blogs);
    setTotalPages(resp.data.totalPages);
   } else {
    const response = await axios.get(
     `${apiUrl}/api/blogs?page=${currentPage}&limit=10`
    );
    setBlogs(response.data.blogs);
    setTotalPages(response.data.totalPages);
   }
  } catch (err) {
   console.error(err);
  } finally {
   setIsLoading(false);
  }
 };

 if (isLoading) return <Loader />;

 return (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
   <div className="container mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
     {/* Main Content */}
     <div className="lg:col-span-3">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
       أحدث المنشورات
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {blogs?.map((blog) => (
        <Link to={`/blog/${blog._id}`} key={blog._id}>
         <BlogCard blog={blog} setBlogs={setBlogs} isAdmin={isAdmin} />
        </Link>
       ))}
      </div>
      {totalPages > 1 && (
       <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
         <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`mx-1 px-4 py-2 rounded ${
           currentPage === i + 1
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          }`}
         >
          {i + 1}
         </button>
        ))}
       </div>
      )}
     </div>

     {/* Sidebar for Most Used Tags */}
     {blogs?.length > 0 && <MostUsedTags />}
    </div>
   </div>
  </div>
 );
};

export default Home;
