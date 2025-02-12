import { Link, useNavigate } from "react-router-dom";
import { profilePlaceHolder } from "./BlogCard";
import { useAuth } from "../../context/AuthContext";
import { BiLogOut } from "react-icons/bi";
import { BLOG_NAME } from "../../../constants";
import { RiLoginBoxFill } from "react-icons/ri";

const Navbar = () => {
 const { currentUser, setCurrentUser } = useAuth();
 const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem("token"); // Clear token
  setCurrentUser(null); // Clear user state
  navigate("/login"); // Redirect to login page
 };

 return (
  <nav className="bg-white dark:bg-gray-800 shadow-md">
   <div className="container mx-auto px-4 py-2 flex justify-between items-center">
    <Link to="/" className="text-xl text-gray-800 dark:text-white font-light">
     {BLOG_NAME}
    </Link>
    <div className="flex items-center space-x-4">
     {currentUser ? (
      <>
       <Link
        to="/publish"
        className="text-gray-800 dark:text-white hover:text-gray-600"
       >
        قم بالنشر
       </Link>
       <div className="flex items-center space-x-2">
        <img
         src={currentUser.profilePicture || profilePlaceHolder}
         alt="Profile"
         className="w-8 h-8 rounded-full object-cover"
        />
        <Link to={"/profile"} className="text-gray-800 dark:text-white">
         {currentUser.username}
        </Link>
       </div>
       <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-1 text-gray-800 dark:text-white hover:text-gray-600 cursor-pointer"
       >
        تسجيل الخروج
        <BiLogOut className="rotate-x-15 -rotate-y-30" size={20} />
       </button>
      </>
     ) : (
      <>
       <Link
        to="/login"
        className="text-gray-800 dark:text-white hover:text-gray-600 flex items-center gap-1 justify-center"
       >
        <RiLoginBoxFill size={20} /> تسجيل الدخول
       </Link>
       <Link
        to="/register"
        className="text-gray-800 dark:text-white hover:text-gray-600"
       >
        التسجيل
       </Link>
      </>
     )}
    </div>
   </div>
  </nav>
 );
};

export default Navbar;
