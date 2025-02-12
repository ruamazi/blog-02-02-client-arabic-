import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/blog/Navbar";
import Login from "./pages/blog/Login";
import Register, { apiUrl } from "./pages/blog/Register";
import SingleBlog from "./pages/blog/SingleBlog";
import Publish from "./pages/blog/Publish";
import Profile from "./pages/blog/Profile";
import axios from "axios";
import Loader from "./components/blog/Loader";
import { useAuth } from "./context/AuthContext";
import UpdateBlog from "./components/blog/UpdateBlog";
import User from "./pages/blog/User";
import BlogsByTag from "./pages/blog/BlogsByTag";
import PageNotFound from "./components/blog/PageNotFound";

function App() {
 const { currentUser, setCurrentUser } = useAuth();
 const [loadingUser, setLoadingUser] = useState(false);

 useEffect(() => {
  const getCurrentUser = async () => {
   const token = localStorage.getItem("token");
   if (!token) return;
   setLoadingUser(true);
   try {
    const resp = await axios.get(`${apiUrl}/api/users/profile`, {
     headers: { Authorization: `Bearer ${token}` },
    });
    setCurrentUser(resp.data);
   } catch (error) {
    console.error("Failed to fetch user profile", err);
    localStorage.removeItem("token");
   } finally {
    setLoadingUser(false);
   }
  };
  getCurrentUser();
 }, [setCurrentUser]);

 if (loadingUser) return <Loader />;

 return (
  <div dir="rtl" className="min-h-screen bg-gray-100 dark:bg-gray-900">
   <Navbar user={currentUser} setUser={setCurrentUser} />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route
     path="/register"
     element={currentUser ? <Navigate to="/" /> : <Register />}
    />
    <Route
     path="/login"
     element={currentUser ? <Navigate to="/" /> : <Login />}
    />
    <Route path="/profile" element={<Profile />} />
    <Route path="/blog/:id" element={<SingleBlog />} />
    <Route path="/publish" element={<Publish />} />
    <Route path="/update-blog/:id" element={<UpdateBlog />} />
    <Route path="/user/:username" element={<User />} />
    <Route path="/blogs/:tag" element={<BlogsByTag />} />
    <Route path="*" element={<PageNotFound />} />
   </Routes>
  </div>
 );
}

export default App;
