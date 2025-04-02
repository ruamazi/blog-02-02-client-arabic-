import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "./Register";
import { useAuth } from "../../context/AuthContext";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { useTheme } from "../../context/ThemeContext";

const Login = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
 const navigate = useNavigate();
 const { setCurrentUser } = useAuth();
 const { colors, darkMode: isDark } = useTheme();

 const handleSubmit = async (e) => {
  setError("");
  setLoading(true);
  e.preventDefault();
  try {
   const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];
   if (!csrfToken) {
    throw new Error("CSRF token not found");
   }
   console.log(csrfToken);
   //  const csrfResponse = await axios.get(`${apiUrl}/api/auth/csrf-token`, {
   //   withCredentials: true,
   //  });

   await axios.post(
    `${apiUrl}/api/auth/login`,
    {
     email,
     password,
    },
    {
     withCredentials: true,
     headers: {
      "X-CSRF-Token": csrfToken, // Also send as header
     },
    }
   );
   const { data } = await axios.get(`${apiUrl}/api/auth/me`, {
    withCredentials: true,
   });

   setCurrentUser(data.user);
   navigate("/");
   window.location.reload();
  } catch (err) {
   console.log(err);

   setError(
    err.response?.data?.message ||
     err.response?.data?.error ||
     err.response?.data ||
     "Login failed"
   );
  } finally {
   setLoading(false);
  }
 };

 const handleShowPassword = () => {
  setShowPassword(!showPassword);
 };

 return (
  <div className="flex items-center justify-center min-h-screen ">
   <div
    style={{
     backgroundColor: isDark
      ? colors.dark.secondaryBackground
      : colors.light.secondaryBackground,
    }}
    className="p-8 rounded-lg shadow-md w-full max-w-md"
   >
    <h2
     style={{
      color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
     }}
     className="text-2xl font-bold mb-6 text-center"
    >
     تسجيل الدخول
    </h2>
    <form onSubmit={handleSubmit}>
     <div className="mb-4">
      <label
       htmlFor="email"
       style={{
        color: isDark
         ? colors.dark.secondaryColor
         : colors.light.secondaryColor,
       }}
       className="block mb-2"
      >
       البريد الإلكتروني
      </label>
      <input
       type="email"
       id="email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       style={{
        backgroundColor: isDark
         ? colors.dark.primaryBackground
         : colors.light.primaryBackground,
        color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
       }}
       placeholder="email@example.com"
       className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 placeholder:opacity-80"
       required
      />
     </div>
     <div className="mb-6 relative">
      <label
       htmlFor="password"
       style={{
        color: isDark
         ? colors.dark.secondaryColor
         : colors.light.secondaryColor,
       }}
       className="block mb-2"
      >
       الرمز السري
      </label>
      <input
       id="password"
       value={password}
       type={showPassword ? "text" : "password"}
       onChange={(e) => setPassword(e.target.value)}
       placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
       style={{
        backgroundColor: isDark
         ? colors.dark.primaryBackground
         : colors.light.primaryBackground,
        color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
       }}
       className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 placeholder:opacity-80 placeholder:text-sm"
       required
      />
      {password.length > 0 && (
       <span className="absolute top-11 left-2">
        {showPassword ? (
         <BiSolidHide
          style={{
           color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
          }}
          className="text-2xl cursor-pointer opacity-80"
          size={20}
          onClick={handleShowPassword}
         />
        ) : (
         <BiSolidShow
          style={{
           color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
          }}
          className="text-2xl cursor-pointer opacity-80"
          size={20}
          onClick={handleShowPassword}
         />
        )}
       </span>
      )}
     </div>

     {error && <p className="text-red-500 mb-4">{error}</p>}
     <button
      type="submit"
      disabled={loading}
      style={{
       backgroundColor: isDark
        ? colors.dark.primaryBtn
        : colors.light.primaryBtn,
      }}
      className="w-full opacity-90 hover:opacity-100 text-white py-2 px-4 rounded-lg transition duration-200"
     >
      {loading ? "جاري التحقق..." : "الدخول"}
     </button>
    </form>
    <p
     style={{
      color: isDark ? colors.dark.secondaryColor : colors.light.secondaryColor,
     }}
     className="mt-4 text-center mb-4"
    >
     ليس لديك عضوية ؟ &nbsp;
     <Link
      to="/register"
      style={{
       color: isDark ? colors.dark.primaryBtn : colors.light.primaryBtn,
      }}
      className="hover:underline"
     >
      قم بالتسجيل الآن
     </Link>
    </p>
    <Link
     to="/forget-password"
     style={{
      color: isDark ? colors.dark.primaryBtn : colors.light.primaryBtn,
     }}
     className="hover:underline text-sm"
    >
     &#9679; نسيت كلمة المرور
    </Link>
   </div>
  </div>
 );
};

export default Login;
