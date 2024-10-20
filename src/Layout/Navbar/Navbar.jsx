import { Link } from "react-router-dom";
import "./style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../Hooks/useAuth";
import useUpcomingCarts from "../../Hooks/useUpcomingCarts";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import NavLinks from "./NavLinks ";
import DarkModeToggle from "./DarkModeToggle ";
import UserProfileDropdown from "./UserProfileDropdown ";

const Navbar = () => {
  const { user, logOut, toggleDarkMode, darkMode } = useAuth();
  const [toggle, setToggle] = useState(false);
  const [carts] = useUpcomingCarts();

  return (
    <div
      className={`flex justify-between items-center px-5 py-3 ${
        darkMode ? "bg-black" : "bg-[#161616]"
      } sticky top-0 z-20 shadow-lg`}
    >
      <div className='justify-between flex items-center'>
        <MobileSidebar
          toggle={toggle}
          setToggle={setToggle}
          navLink={<NavLinks carts={carts} />}
        />

        {/* Brand Logo */}
        <Link
          to='/'
          className='btn btn-ghost normal-case text-xl text-[#DDDDDD]'
        >
          UniStayHub
        </Link>
      </div>

      {/* Navigation Links for Large Screens */}
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <NavLinks carts={carts} />
        </ul>
      </div>

      <ToastContainer />

      <div className='flex items-center justify-end'>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        {user ? (
          <UserProfileDropdown user={user} logOut={logOut} />
        ) : (
          <Link
            to='/login'
            className='bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold py-2 px-4 rounded-br-full rounded-tl-full transition duration-300 ease-in-out hover:scale-105'
          >
            Join Us
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
