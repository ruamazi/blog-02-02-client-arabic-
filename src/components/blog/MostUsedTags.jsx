import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { apiUrl } from "../../pages/blog/Register";
import { Link } from "react-router-dom";

const MostUsedTags = () => {
 const [tags, setTags] = useState([]);
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
  fetchMostUsedTags();
 }, []);

 const fetchMostUsedTags = async () => {
  setIsLoading(true);
  try {
   const response = await axios.get(`${apiUrl}/api/blogs/most-used-tags`);
   setTags(response.data.data);
  } catch (err) {
   console.error("Error fetching most used tags:", err);
  } finally {
   setIsLoading(false);
  }
 };

 if (isLoading) return <Loader />;

 return (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg h-fit py4">
   <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
    هاشتاجات متداولة
   </h2>
   <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
     <Link
      to={`/blogs/${tag._id}`}
      key={tag._id}
      className="bg-blue-500/30 hover:bg-blue-500/50 px-3 py-1 rounded-full text-sm"
     >
      {tag._id} ({tag.count})
     </Link>
    ))}
   </div>
  </div>
 );
};

export default MostUsedTags;
