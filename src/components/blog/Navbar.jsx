import { Link, useNavigate } from "react-router-dom";
import { profilePlaceHolder } from "./BlogCard";
import { useAuth } from "../../context/AuthContext";
import { BiLogOut } from "react-icons/bi";
import { BLOG_NAME } from "../../../constants";
import { RiLoginBoxFill } from "react-icons/ri";
import { MdOutlineCreate } from "react-icons/md";
import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
 const { currentUser, setCurrentUser } = useAuth();
 const { darkMode, toggleDarkMode } = useTheme();

 const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem("token");
  setCurrentUser(null);
  navigate("/login");
 };

 return (
  <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
   <div className="container mx-auto px-4 py-2 flex justify-center items-center md:justify-between">
    <Link
     to="/"
     className="text-xl text-gray-800 dark:text-white font-light transition-colors duration-200 hidden md:block"
    >
     {BLOG_NAME}
    </Link>
    <div className="flex items-center space-x-4">
     <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors duration-200 dark:bg-slate-700"
      aria-label="Toggle dark mode"
     >
      {darkMode ? (
       <BsSun className="text-yellow-500" size={20} />
      ) : (
       <BsMoon className="text-gray-600 dark:text-gray-400" size={20} />
      )}
     </button>
     {currentUser ? (
      <>
       <Link
        to="/publish"
        className="text-gray-800 dark:text-white hover:text-blue-500 flex items-center justify-center gap-1 hover:underline hover:underline-offset-4 hover:decoration-2 transition-all duration-200"
       >
        انشر <MdOutlineCreate size={20} />
       </Link>
       <div className="flex items-center space-x-2 bg-blue-500/30 hover:bg-blue-500/50 py-1 px-2 rounded-2xl transition-colors duration-200">
        <img
         src={currentUser.profilePicture || profilePlaceHolder}
         alt="Profile"
         className="w-8 h-8 rounded-full object-cover"
        />
        <Link
         to={"/profile"}
         className="text-gray-800 dark:text-white transition-colors duration-200"
        >
         {currentUser.username}
        </Link>
       </div>
       <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-1 text-gray-800 dark:text-white hover:text-gray-600 hover:underline hover:underline-offset-4 hover:decoration-2 transition-all duration-200"
       >
        الخروج
        <BiLogOut className="rotate-x-15 -rotate-y-30" size={20} />
       </button>
      </>
     ) : (
      <>
       <Link
        to="/login"
        className="text-gray-800 dark:text-white hover:text-blue-500 flex items-center gap-1 justify-center transition-colors duration-200"
       >
        <RiLoginBoxFill size={20} /> تسجيل الدخول
       </Link>
       <Link
        to="/register"
        className="text-gray-800 dark:text-white hover:text-blue-500 transition-colors duration-200"
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
