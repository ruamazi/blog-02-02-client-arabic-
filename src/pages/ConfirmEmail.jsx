import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./blog/Register";

const ConfirmEmail = () => {
 const [userEmail, setUserEmail] = useState("");
 const [successMessage, setSuccessMessage] = useState("");
 const [sending, setSending] = useState(false);
 const [error, setError] = useState("");
 const navigate = useNavigate();

 const handleOrderNewEmail = async (e) => {
  setError("");
  setSending(true);
  e.preventDefault();
  if (!userEmail || userEmail.trim() === "") return;
  try {
   await axios.post(`${apiUrl}/api/auth/order-new-confirmation-email`, {
    email: userEmail,
   });
   setSuccessMessage("تم ارسال بريد التفعيل بنجاح");
  } catch (err) {
   console.log(err);
   setError(err.response?.data?.error || "حدث خطأ اثناء التسجيل");
  } finally {
   setSending(false);
  }
 };

 return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
   <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white text-center">
     تم ارسال بريد التحقق الى حسابكم الالكتروني
    </h2>
    <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
     الرجاء التحقق من بريدك الالكتروني ثم تسجيل الدخول
    </p>
    {!successMessage && (
     <>
      <label>اطلب بريد التحقق مجددا</label>
      <input
       type="email"
       value={userEmail}
       onChange={(e) => setUserEmail(e.target.value)}
       className="w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
       placeholder="البريد الالكتروني"
      />
     </>
    )}
    {userEmail && !successMessage && (
     <button
      disabled={!userEmail || successMessage || sending}
      onClick={handleOrderNewEmail}
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
     >
      {sending ? "جاري الارسال ..." : "ارسال"}
     </button>
    )}
    {successMessage && <p className="mb-2 text-green-500">{successMessage}</p>}
    {error && <p className="mb-2 text-red-500">{error}</p>}
    <p className=" text-gray-700 dark:text-gray-300 mb-4 text-sm">
       في حالة عدم وصول البريد، الرجاء التحقق من مجلد البريد العشوائي أو الاتصال
     بنا.
    </p>

    <button
     onClick={() => navigate("/login")}
     className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
    >
     الدخول
    </button>
   </div>
  </div>
 );
};

export default ConfirmEmail;
