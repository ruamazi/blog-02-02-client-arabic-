import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./Register";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const navigate = useNavigate();
 const { setCurrentUser } = useAuth();

 const handleSubmit = async (e) => {
  setError("");
  e.preventDefault();
  try {
   const response = await axios.post(`${apiUrl}/api/auth/login`, {
    email,
    password,
   });
   localStorage.setItem("token", response.data.token);
   setCurrentUser(response.data.user);
   navigate("/"); // Redirect to home page after login
  } catch (err) {
   setError(err.response?.data?.message || "Login failed");
  }
 };

 return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
   <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
     تسجيل الدخول
    </h2>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <form onSubmit={handleSubmit}>
     <div className="mb-4">
      <label
       htmlFor="email"
       className="block text-gray-700 dark:text-gray-300 mb-2"
      >
       البريد الإلكتروني
      </label>
      <input
       type="email"
       id="email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
       required
      />
     </div>
     <div className="mb-6">
      <label
       htmlFor="password"
       className="block text-gray-700 dark:text-gray-300 mb-2"
      >
       الرمز السري
      </label>
      <input
       type="password"
       id="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
       required
      />
     </div>
     <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
     >
      الدخول
     </button>
    </form>
    <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
     ليس لديك عضوية ؟ &nbsp;
     <a href="/register" className="text-blue-500 hover:underline">
      قم بالتسجيل الآن
     </a>
    </p>
   </div>
  </div>
 );
};

export default Login;
