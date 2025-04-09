import { useEffect, useState } from "react";
import axios from "axios";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import BackToHome from "../components/BackToHome";
import { apiUrl } from "./blog/Register";
import UserMsgs from "../components/UserMsgs";

const ContactAdmins = () => {
 const { currentUser } = useAuth();
 const [subject, setSubject] = useState("");
 const [message, setMessage] = useState("");
 const [email, setEmail] = useState("");
 const [successMessage, setSuccessMessage] = useState("");
 const [error, setError] = useState("");
 const [isSubmitting, setIsSubmitting] = useState(false);
 const { colors, darkMode: isDark } = useTheme();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSuccessMessage("");
  setError("");
  try {
   if (!subject || subject.trim() === "") {
    setError("الرجاء إدخال عنوان الرسالة");
    return;
   }
   if (subject.length > 100) {
    setError("العنوان يجب أن لا يتجاوز 100 حرفًا");
    return;
   }
   if (!message || message.trim() === "") {
    setError("الرجاء إدخال محتوى الرسالة");
    return;
   }
   if (message.length > 2000) {
    setError("الرسالة يجب أن لا تتجاوز 2000 حرفًا");
    return;
   }
   if (!currentUser && (!email || !validateEmail(email))) {
    setError("الرجاء إدخال بريد إلكتروني صحيح");
    return;
   }
   await axios.post(`${apiUrl}/api/contact/send-msg`, {
    subject,
    message,
    email: currentUser?.email || email,
    username: currentUser?.username,
    isGuest: !currentUser,
    userId: currentUser?._id,
   });
   setSuccessMessage("تم إرسال رسالتك بنجاح، شكراً لتواصلك معنا!");
   setSubject("");
   setMessage("");
   setEmail("");
  } catch (err) {
   console.log(err);
   setError(err.response?.data?.error || "فشل في إرسال الرسالة");
  } finally {
   setIsSubmitting(false);
  }
 };

 useEffect(() => {
  document.title = "تواصل مع المشرفين";
 }, []);

 return (
  <>
   <div className="min-h-screen p-4 flex flex-col gap-6 mx-auto container">
    <div className="container mx-auto">
     <div
      style={{
       backgroundColor: isDark
        ? colors.dark.secondaryBackground
        : colors.light.secondaryBackground,
      }}
      className="p-6 rounded-lg shadow-md mx-auto max-w-[750px]"
     >
      <div className="flex items-center gap-2 mb-4">
       <LuMessageCircleQuestion
        size={25}
        style={{
         color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
        }}
       />
       <h2
        style={{
         color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
        }}
        className="text-xl font-bold"
       >
        أرسل رسالة للمشرفين
       </h2>
      </div>

      <p
       className="mb-6"
       style={{
        color: isDark ? colors.dark.textColor : colors.light.textColor,
       }}
      >
       يمكنك استخدام هذا النموذج لإرسال استفساراتك، مقترحاتك، أو أي مشكلات
       تواجهك في الموقع.
      </p>

      <form onSubmit={handleSubmit}>
       <div className="mb-4">
        <label
         htmlFor="subject"
         className="block mb-2"
         style={{
          color: isDark ? colors.dark.textColor : colors.light.textColor,
         }}
        >
         عنوان الرسالة
        </label>
        <input
         type="text"
         id="subject"
         placeholder="مثال: مشكلة في التسجيل"
         value={subject}
         onChange={(e) => setSubject(e.target.value)}
         style={{
          backgroundColor: isDark
           ? colors.dark.primaryBackground
           : colors.light.primaryBackground,
         }}
         className="w-full px-4 py-2 rounded-lg placeholder:text-gray-500"
        />
       </div>
       <div className="mb-2">
        <label
         htmlFor="message"
         className="block mb-2"
         style={{
          color: isDark ? colors.dark.textColor : colors.light.textColor,
         }}
        >
         محتوى الرسالة
        </label>
        <textarea
         id="message"
         rows="6"
         placeholder="اكتب رسالتك هنا..."
         value={message}
         onChange={(e) => setMessage(e.target.value)}
         style={{
          backgroundColor: isDark
           ? colors.dark.primaryBackground
           : colors.light.primaryBackground,
         }}
         className="w-full px-4 py-2 rounded-lg placeholder:text-gray-500"
        ></textarea>
       </div>
       {!currentUser && (
        <div className="mb-4">
         <label
          htmlFor="email"
          className="block mb-2"
          style={{
           color: isDark ? colors.dark.textColor : colors.light.textColor,
          }}
         >
           البريد الإلكتروني
         </label>
         <input
          type="email"
          id="email"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
           backgroundColor: isDark
            ? colors.dark.primaryBackground
            : colors.light.primaryBackground,
          }}
          className="w-full px-4 py-2 rounded-lg placeholder:text-gray-500"
         />
        </div>
       )}
       <div className="flex justify-end">
        {!successMessage && (
         <button
          type="submit"
          disabled={isSubmitting}
          style={{
           backgroundColor: isDark
            ? colors.dark.primaryBtn
            : colors.light.primaryBtn,
          }}
          className="opacity-85 hover:opacity-100 text-white px-6 py-2 rounded-lg transition duration-200 disabled:opacity-50 flex items-center gap-2"
         >
          {isSubmitting ? " جاري الإرسال..." : "إرسال الرسالة"}
         </button>
        )}
       </div>
      </form>

      {successMessage && (
       <div className="mt-4 p-3 rounded-lg bg-green-100 text-green-700 text-center">
        {successMessage}
       </div>
      )}

      {error && (
       <div className="mt-4 p-3 rounded-lg bg-red-100 text-red-700 text-center">
        {error}
       </div>
      )}

      {currentUser && (
       <div
        className="mt-6 p-3 rounded-lg text-sm"
        style={{
         backgroundColor: isDark
          ? colors.dark.primaryBackground
          : colors.light.primaryBackground,
         color: isDark ? colors.dark.textColor : colors.light.textColor,
        }}
       >
        <p>
         سيتم إرسال الرسالة من حسابك: <strong>{currentUser.username}</strong>
        </p>
        <p className="mt-1">
         البريد الإلكتروني: <strong>{currentUser.email}</strong>
        </p>
       </div>
      )}
     </div>
     <UserMsgs />
    </div>
   </div>
   <BackToHome />
  </>
 );
};

export default ContactAdmins;

// Email validation helper
const validateEmail = (email) => {
 const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return re.test(email);
};
