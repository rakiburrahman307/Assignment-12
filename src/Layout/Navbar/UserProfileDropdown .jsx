import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import PropTypes from 'prop-types';

const UserProfileDropdown = ({ user, logOut }) => {

  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <div ref={dropDownRef} className='relative'>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className='btn btn-ghost btn-circle avatar'
      >
        <div className='w-10 rounded-full'>
          <img src={user.photoURL} alt='User Avatar' />
        </div>
      </button>

      {/* Profile Dropdown */}
      <ul
        className={`absolute right-0 top-12 z-50 w-40 bg-slate-200 rounded shadow-md p-2 transition-all duration-300 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <li className='text-black py-1 px-2'>
          <h2 className='font-bold'>{user?.displayName}</h2>
        </li>
        <li className='py-1'>
          <Link
            to='/dashboard'
            className='block px-2 py-1 hover:bg-slate-300 rounded'
          >
            Dashboard
          </Link>
        </li>
        <li className='py-1'>
          <button
            className='w-full text-red-500 px-2 py-1 hover:bg-red-500 hover:text-white rounded'
            onClick={logOut}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};
UserProfileDropdown.propTypes = {
    user: PropTypes.obj,
    logOut: PropTypes.func,
}
export default UserProfileDropdown;
