import { useEffect, useState } from "react";
import { apiUrl } from "../../pages/blog/Register";
import axios from "axios";
import Loader from "./Loader";

const PopularBlogs = () => {
 const [blogs, setBlogs] = useState([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);

 const getPopularBlogs = async () => {
  try {
   setLoading(true);
   const resp = await axios.get(`${apiUrl}/blogs/popular`);
   setBlogs(resp.data);
   console.log(resp.data);
  } catch (error) {
   setError(error);
   setError(resp.data ? resp.data.error : "فشل في تحميل البيانات");
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  getPopularBlogs();
 }, []);

 if (loading) return <Loader />;
 if (error) return <p className="text-center py-5 text-red-500">{error}</p>;

 return (
  <div>
   {blogs.length > 0 && (
    <div>
     <h2>المنشورات الأكثر تفاعلا</h2>
    </div>
   )}
  </div>
 );
};

export default PopularBlogs;
