import { Link, Outlet } from "react-router-dom";
import { VscOpenPreview } from "react-icons/vsc";
import { CiSquareQuestion } from "react-icons/ci";
import { FaHome, FaHouseUser } from "react-icons/fa";
import { MdFormatListBulletedAdd, MdNoMeals, MdOutlineAdminPanelSettings, MdOutlineUpcoming } from "react-icons/md";
import useIsAdmin from "../../Hooks/useIsAdmin";
import { MdManageAccounts } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { AiOutlineCloudServer } from "react-icons/ai";
import PageHelmet from "../../Hooks/pageHelmet";



const Dashboard = () => {
    const [isAdmin] = useIsAdmin();
    return (
        <div className="flex">
            <PageHelmet title='Dashboard'></PageHelmet>
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-base-200">
                <ul className="menu rounded-box">
                    {
                        isAdmin ? <>

                            <li>
                                <Link to="/dashboard/adminProfile">
                                    <MdOutlineAdminPanelSettings />
                                    Admin Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/manageUsers">
                                    <MdManageAccounts />
                                    Manage Users
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/allMeals">
                                    <MdNoMeals />
                                    All Meals
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/addMeals">
                                    <MdFormatListBulletedAdd />
                                    Add Meals
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/serveMeals">
                                    <AiOutlineCloudServer />
                                    Serve Meal
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/allReviews">
                                    <VscPreview />
                                    All Reviews
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/upcoming">
                                    <MdOutlineUpcoming />
                                    Upcoming
                                </Link>
                            </li>

                        </>
                            :
                            <>
                                <ul className="menu bg-base-200 w-56 rounded-box">
                                    <li>
                                        <Link to="/dashboard/userHome">
                                            <FaHouseUser />
                                            My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/dashboard/request_meal'>
                                            <CiSquareQuestion />
                                            Requested Meals
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/dashboard/my_comment'>
                                            <VscOpenPreview />
                                            My Reviews
                                        </Link>
                                    </li>
                                </ul>
                            </>
                    }
                    {/* shared nav links */}
                </ul>
                <div className="divider divider-info">Or</div>
                <ul className="menu bg-base-200 w-56 rounded-box">
                    <li>
                        <Link to='/'>
                            <FaHome />
                            Back To Home
                        </Link>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;