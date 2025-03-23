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
import Dashboard from "./pages/admin/Dashboard";
import ConfirmEmail from "./pages/ConfirmEmail";
import { getWebData } from "./functions/api";

function App() {
 const { currentUser, setCurrentUser } = useAuth();
 const [loadingUser, setLoadingUser] = useState(false);
 const [webSettings, setWebSettings] = useState({
  websiteName: "",
  websiteTitle: "",
  favicon: "",
  websiteLogo: "",
  canPublish: true,
  showLogo: false,
  showName: true,
 });
 const [loadingWebSettings, setLoadingWebSettings] = useState(false);

 const getWebSettingsData = async () => {
  setLoadingWebSettings(true);
  const resp = await getWebData();
  setWebSettings(resp);
  setLoadingWebSettings(false);
 };

 useEffect(() => {
  getWebSettingsData();
 }, []);

 useEffect(() => {
  if (webSettings.websiteTitle && document.title !== webSettings.websiteTitle) {
   document.title = webSettings.websiteTitle; // Set the title dynamically
  }
  if (webSettings.favicon) {
   let link = document.querySelector("link[rel*='icon']");
   if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
   }
   link.href = webSettings.favicon; // Set the favicon dynamically
  }
 }, [webSettings]);

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
    console.error("Failed to fetch user profile", error);
    localStorage.removeItem("token");
   } finally {
    setLoadingUser(false);
   }
  };
  getCurrentUser();
 }, [setCurrentUser]);

 if (loadingUser || loadingWebSettings) return <Loader />;

 return (
  <div
   dir="rtl"
   className={`min-h-screen bg-gray-200 dark:bg-gray-900 transition-colors duration-200`}
  >
   <Navbar />
   <main className="container mx-auto px-4 py-8">
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
     <Route
      path="/confirm-email"
      element={currentUser ? <Navigate to="/" /> : <ConfirmEmail />}
     />
     <Route
      path="/admin"
      element={
       currentUser?.role === "user" ? <Navigate to="/" /> : <Dashboard />
      }
     />
     <Route path="*" element={<PageNotFound />} />
    </Routes>
   </main>
  </div>
 );
}

export default App;
