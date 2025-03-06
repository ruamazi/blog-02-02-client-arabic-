import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";

const BackToHome = () => {
 return (
  <Link to={"/"} className="md:hidden mx-auto float-end m-2">
   <button
    className="bg-blue-500 text-white px-2 py-1 rounded-lg
    hover:bg-blue-600/70 transition duration-200 cursor-pointer flex
     items-center justify-center gap-1 text-sm"
   >
    الرئيسية
    <IoMdHome size={18} className="mb-1.5" />
   </button>
  </Link>
 );
};

export default BackToHome;
