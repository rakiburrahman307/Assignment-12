
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
const NavLinks = ({ carts }) => {
  return (
    <>
      <li>
        <NavLink to='/' className='text-[#DDDDDD] mr-2'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='/meals' className='text-[#DDDDDD] mr-2'>
          Meals
        </NavLink>
      </li>
      <li>
        <NavLink to='/upcoming' className='text-[#DDDDDD] mr-2'>
          Upcoming Meals{" "}
          <span className='badge badge-secondary'>{carts?.length}</span>
        </NavLink>
      </li>
    </>
  );
};
NavLinks.propTypes = {
    carts: PropTypes.array,
    }
export default NavLinks;
