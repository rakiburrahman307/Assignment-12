
import { IoMenu, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MobileSidebar = ({ toggle, setToggle, navLink }) => {
  return (
    <>
      <div className='lg:hidden'>
        <label>
          <IoMenu onClick={() => setToggle(true)} size={30} color='#FFFFFF' />
        </label>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
          toggle ? "translate-x-0" : "-translate-x-full"
        } z-40 lg:hidden`}
      >
        <div className='flex justify-between items-center p-4'>
          <Link to='/' className='btn btn-ghost normal-case text-xl text-[#DDDDDD]'>
            UniStayHub
          </Link>
          <IoClose onClick={() => setToggle(false)} size={30} color='#FFFFFF' />
        </div>
        <ul className='p-6 space-y-4'>{navLink}</ul>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ease-in-out ${
          toggle ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setToggle(false)}
      ></div>
    </>
  );
};

export default MobileSidebar;
