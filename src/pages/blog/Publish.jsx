import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./Register";
import BackToHome from "../../components/BackToHome";

const Publish = () => {
 const [title, setTitle] = useState("");
 const [content, setContent] = useState("");
 const [tags, setTags] = useState("");
 const [isPrivate, setIsPrivate] = useState(false);
 const [error, setError] = useState("");
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   const token = localStorage.getItem("token");
   await axios.post(
    `${apiUrl}/api/blogs`,
    { title, content, tags: tags.split(","), isPrivate },
    { headers: { Authorization: `Bearer ${token}` } }
   );
   navigate("/");
  } catch (err) {
   setError(err.response?.data?.message || "Failed to publish blog");
  }
 };

 return (
  <>
   {" "}
   <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
    <div className="container mx-auto">
     <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
      قم بنشر موضوع جديد
     </h1>
     <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
       <div className="mb-4 ">
        <label
         htmlFor="title"
         className="block text-gray-700 dark:text-gray-300 mb-2"
        >
         العنوان
        </label>
        <input
         type="text"
         id="title"
         placeholder="اكتب عنوان المدونة ..."
         value={title}
         onChange={(e) => setTitle(e.target.value)}
         className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white placeholder:text-gray-400"
         required
        />
       </div>
       <div className="mb-4">
        <label
         htmlFor="content"
         className="block text-gray-700 dark:text-gray-300 mb-2"
        >
         المحتوى
        </label>
        <textarea
         id="content"
         placeholder="اكتب محتوى المدونة ..."
         value={content}
         onChange={(e) => setContent(e.target.value)}
         className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white placeholder:text-gray-400"
         rows="6"
         required
        />
       </div>
       <div className="mb-4">
        <label
         htmlFor="tags"
         className="block text-gray-700 dark:text-gray-300 mb-2"
        >
         هاشتاغ (فصل بواسطة الفاصلة)
        </label>
        <input
         type="text"
         id="tags"
         placeholder="اكتب هاشتاغ المدونة ..."
         value={tags}
         onChange={(e) => setTags(e.target.value)}
         className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white placeholder:text-gray-400"
        />
       </div>
       <div className="mb-4 flex gap-1">
        <label className="block text-gray-700 dark:text-gray-300">النشر:</label>
        <div className="flex items-center gap-[2px]">
         <input
          type="radio"
          id="public"
          name="visibility"
          value="true"
          checked={isPrivate === false}
          onChange={() => setIsPrivate(false)}
          className="mr-2"
         />
         <label htmlFor="public" className=" text-gray-700 dark:text-gray-300">
          عام
         </label>
         <input
          type="radio"
          id="private"
          name="visibility"
          value="false"
          checked={isPrivate === true}
          onChange={() => setIsPrivate(true)}
          className="mr-2"
         />
         <label htmlFor="private" className="text-gray-700 dark:text-gray-300">
          خاص
         </label>
        </div>
       </div>
       <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
       >
        انشر
       </button>
      </form>
     </div>
    </div>
   </div>
   <BackToHome />
  </>
 );
};

export default Publish;
