import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { useTheme } from "../context/ThemeContext";

const BackToHome = () => {
 const { colors, darkMode: isDark } = useTheme();

 return (
  <Link to={"/"} className="md:hidden mx-auto float-end m-2">
   <button
    style={{
     backgroundColor: isDark
      ? colors.dark.backToHomeBtn
      : colors.light.backToHomeBtn,
    }}
    className=" text-white px-2 py-1 rounded-lg
    hover:bg-slate-700 transition duration-200 cursor-pointer flex
     items-center justify-center gap-1 text-sm"
   >
    الرئيسية
    <IoMdHome size={18} className="mb-1.5" />
   </button>
  </Link>
 );
};

export default BackToHome;
