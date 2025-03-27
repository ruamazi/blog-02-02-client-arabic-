import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./Register";
import BackToHome from "../../components/BackToHome";
import { useTheme } from "../../context/ThemeContext";

const Publish = () => {
 const [title, setTitle] = useState("");
 const [content, setContent] = useState("");
 const [tags, setTags] = useState("");
 const [isPrivate, setIsPrivate] = useState(false);
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
 const { colors, darkMode: isDark } = useTheme();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  try {
   const token = localStorage.getItem("token");
   await axios.post(
    `${apiUrl}/api/blogs`,
    { title, content, tags: tags.split(","), isPrivate },
    { headers: { Authorization: `Bearer ${token}` } }
   );
   navigate("/");
  } catch (err) {
   console.log(err);
   setError(err.response?.data?.error || " حدث خطأ ما");
  } finally {
   setLoading(false);
  }
 };

 return (
  <>
   <div className="min-h-screen p-4">
    <div className="container mx-auto">
     <h1
      style={{
       color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
      }}
      className="text-3xl font-bold mb-6"
     >
      قم بنشر موضوع جديد
     </h1>
     <div
      style={{
       backgroundColor: isDark
        ? colors.dark.secondaryBackground
        : colors.light.secondaryBackground,
      }}
      className="p-6 rounded-lg shadow-md"
     >
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
       <div className="mb-4 ">
        <label
         htmlFor="title"
         style={{
          color: isDark
           ? colors.dark.secondaryColor
           : colors.light.secondaryColor,
         }}
         className="block mb-2"
        >
         العنوان
        </label>
        <input
         type="text"
         id="title"
         placeholder="اكتب عنوان المدونة ..."
         value={title}
         onChange={(e) => setTitle(e.target.value)}
         style={{
          backgroundColor: isDark
           ? colors.dark.primaryBackground
           : colors.light.primaryBackground,
          color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
         }}
         className="w-full px-4 py-2 rounded-lg placeholder:text-sm"
         required
        />
       </div>
       <div className="mb-4">
        <label
         htmlFor="content"
         style={{
          color: isDark
           ? colors.dark.secondaryColor
           : colors.light.secondaryColor,
         }}
         className="block mb-2"
        >
         المحتوى
        </label>
        <textarea
         id="content"
         placeholder="اكتب محتوى المدونة ..."
         value={content}
         onChange={(e) => setContent(e.target.value)}
         style={{
          backgroundColor: isDark
           ? colors.dark.primaryBackground
           : colors.light.primaryBackground,
          color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
         }}
         className="w-full px-4 py-2 rounded-lg"
         rows="6"
         required
        />
       </div>
       <div className="mb-4">
        <label
         htmlFor="tags"
         style={{
          color: isDark
           ? colors.dark.secondaryColor
           : colors.light.secondaryColor,
         }}
         className="block mb-2"
        >
         هاشتاغ (فصل بواسطة الفاصلة)
        </label>
        <input
         type="text"
         id="tags"
         placeholder="اكتب هاشتاغ المدونة ..."
         value={tags}
         onChange={(e) => setTags(e.target.value)}
         style={{
          backgroundColor: isDark
           ? colors.dark.primaryBackground
           : colors.light.primaryBackground,
          color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
         }}
         className="w-full px-4 py-2 rounded-lg placeholder:text-sm"
        />
       </div>
       <div className="mb-4 flex gap-1">
        <label
         style={{
          color: isDark
           ? colors.dark.secondaryColor
           : colors.light.secondaryColor,
         }}
         className="block "
        >
         النشر:
        </label>
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
         <label
          style={{
           color: isDark
            ? colors.dark.secondaryColor
            : colors.light.secondaryColor,
          }}
          htmlFor="public"
         >
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
         <label
          style={{
           color: isDark
            ? colors.dark.secondaryColor
            : colors.light.secondaryColor,
          }}
          htmlFor="private"
         >
          خاص
         </label>
        </div>
       </div>
       <button
        type="submit"
        disabled={loading}
        style={{
         backgroundColor: isDark
          ? colors.dark.primaryBtn
          : colors.light.primaryBtn,
        }}
        className="opacity-90 hover:opacity-100 text-white px-8 py-1 rounded-lg transition duration-200"
       >
        {loading ? "جاري النشر..." : "نشر"}
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
