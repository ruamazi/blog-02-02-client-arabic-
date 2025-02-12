import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import BlogCard from "../../components/blog/BlogCard";
import { apiUrl } from "./Register";
import Loader from "../../components/blog/Loader";

const BlogsByTag = () => {
 const { tag } = useParams(); // Get the tag from the URL
 const [blogs, setBlogs] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
  fetchBlogsByTag();
 }, [currentPage, tag]); // Re-fetch blogs when the page or tag changes

 const fetchBlogsByTag = async () => {
  setIsLoading(true);
  try {
   const resp = await axios.get(
    `${apiUrl}/api/blogs/tag?tag=${tag}&page=${currentPage}&limit=10`
   );
   setBlogs(resp.data.blogs);
   setTotalPages(resp.data.totalPages);
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
    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
     Blogs Tagged with: <span className="text-blue-500">{tag}</span>
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {blogs.map((blog) => (
      <Link to={`/blog/${blog._id}`} key={blog._id}>
       <BlogCard blog={blog} />
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
  </div>
 );
};

export default BlogsByTag;
