import { Link, Outlet, useNavigate } from "react-router-dom";
import { VscOpenPreview } from "react-icons/vsc";
import { CiSquareQuestion } from "react-icons/ci";
import { FaHome, FaHouseUser } from "react-icons/fa";
import { MdFormatListBulletedAdd, MdNoMeals, MdOutlineAdminPanelSettings, MdOutlineUpcoming } from "react-icons/md";
import useIsAdmin from "../../Hooks/useIsAdmin";
import { MdManageAccounts } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { AiOutlineCloudServer } from "react-icons/ai";
import { useEffect } from "react";


const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useIsAdmin();
    const navigate = useNavigate();

    console.log('Dashboard rendered. isAdmin:', isAdmin);

    useEffect(() => {
        // Check if isAdmin is true and navigate to admin profile
        if (isAdmin !== undefined && isAdmin.admin) {
            navigate('/dashboard/adminProfile');
        }else{
            navigate('/dashboard/userHome');
        }
    }, [isAdmin, navigate]);
    if (isAdminLoading || isAdmin === undefined || isAdmin === false) {
        return <span className="loading ml-[700px] loading-dots loading-lg"></span>;
    }

    return (
        <div className="flex">

            {/* dashboard side bar */}
            <div className="w-32 md:w-64 min-h-screen bg-base-200">
                <ul className="menu rounded-box p-0 md:p-5">
                    {isAdmin && isAdmin.admin && isAdmin !== undefined ? (
                        <>
                            <li>
                                <Link to="/dashboard/adminProfile" className="flex flex-col md:flex-row items-center text-center">
                                    <MdOutlineAdminPanelSettings />
                                    Admin Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/manageUsers" className="flex flex-col md:flex-row items-center text-center">
                                    <MdManageAccounts />
                                    Manage Users
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/allMeals" className="flex flex-col md:flex-row items-center text-center">
                                    <MdNoMeals />
                                    All Meals
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/addMeals" className="flex flex-col md:flex-row items-center text-center">
                                    <MdFormatListBulletedAdd />
                                    Add Meals
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/serveMeals" className="flex flex-col md:flex-row items-center text-center">
                                    <AiOutlineCloudServer />
                                    Serve Meal
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/allReviews" className="flex flex-col md:flex-row items-center text-center">
                                    <VscPreview />
                                    All Reviews
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/upcoming" className="flex flex-col md:flex-row items-center text-center">
                                    <MdOutlineUpcoming />
                                    Upcoming
                                </Link>
                            </li>

                        </>
                    ) : (
                        <>
                            <ul className="menu bg-base-200 w-56 rounded-box">
                                <li>
                                    <Link to="/dashboard/userHome" className="flex flex-col md:flex-row items-center text-center">
                                        <FaHouseUser />
                                        My Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/request_meal' className="flex flex-col md:flex-row items-center text-center">
                                        <CiSquareQuestion />
                                        Requested Meals
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/my_comment' className="flex flex-col md:flex-row items-center text-center">
                                        <VscOpenPreview />
                                        My Reviews
                                    </Link>
                                </li>
                            </ul>
                        </>
                    )}

                </ul>
                <div className="divider divider-info">Or</div>
                <ul className="menu rounded-box p-0 md:p-5">
                    <li>
                        <Link to='/' className="flex flex-col md:flex-row items-center text-center">
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