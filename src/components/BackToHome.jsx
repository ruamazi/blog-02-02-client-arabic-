import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { PiKeyReturnFill } from "react-icons/pi";

const BackToHome = () => {
 return (
  <Link to={"/"} className="md:hidden mx-auto float-end mb-2">
   <button
    className="bg-blue-500 text-white px-2 py-2 rounded-lg
    hover:bg-blue-600/70 transition duration-200 cursor-pointer flex
     items-center justify-center gap-1"
   >
    <PiKeyReturnFill size={22} /> <IoMdHome size={20} className="" />
   </button>
  </Link>
 );
};

export default BackToHome;
