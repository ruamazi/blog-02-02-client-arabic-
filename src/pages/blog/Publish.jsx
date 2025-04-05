import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./Register";
import BackToHome from "../../components/BackToHome";
import { useTheme } from "../../context/ThemeContext";
import TextEditor from "../../components/blog/TextEditor";

const Publish = () => {
 const [title, setTitle] = useState("");
 const [content, setContent] = useState(""); // Track content from TextEditor
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
   await axios.post(
    `${apiUrl}/api/blogs`,
    {
     title,
     content,
     tags: tags
      .split(/[,،.\s]+/)
      .map((tag) => tag.trim())
      .filter(
       (tag) => tag.length > 0 && !tag.includes(" ") && tag.length <= 20
      ),
     isPrivate,
    },
    {
     withCredentials: true,
    }
   );

   navigate("/");
  } catch (err) {
   console.log(err);
   setError(err.response?.data?.error || "حدث خطأ ما");
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  document.title = "النشر";
 }, []);

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
      <form
       onSubmit={handleSubmit}
       onKeyDown={(e) => {
        if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
         e.preventDefault();
        }
       }}
      >
       <div className="mb-4">
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

       {/* Use TextEditor instead of textarea */}
       <div className="mb-4">
        <label
         style={{
          color: isDark
           ? colors.dark.secondaryColor
           : colors.light.secondaryColor,
         }}
         className="block mb-2"
        >
         المحتوى
        </label>
        <TextEditor content={content} setContent={setContent} />
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
