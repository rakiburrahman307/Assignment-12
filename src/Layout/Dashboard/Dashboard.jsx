import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { VscOpenPreview } from "react-icons/vsc";
import { CiSquareQuestion } from "react-icons/ci";
import { FaHome, FaHouseUser } from "react-icons/fa";
import { MdFormatListBulletedAdd, MdNoMeals, MdOutlineAdminPanelSettings, MdOutlineUpcoming } from "react-icons/md";
import useIsAdmin from "../../Hooks/useIsAdmin";
import { MdManageAccounts } from "react-icons/md";
import { AiOutlineCloudServer } from "react-icons/ai";

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useIsAdmin();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (isAdmin !== undefined && isAdmin.admin) {
            navigate('/dashboard/adminProfile');
        } else {
            navigate('/dashboard/userHome');
        }
    }, [isAdmin, navigate]);

    if (isAdminLoading || isAdmin === undefined) {
        return <span className="loading ml-[700px] loading-dots loading-lg"></span>;
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    return (
        <div className="flex relative">
            {/* Sidebar Toggle Button */}
            <button 
                onClick={toggleSidebar} 
                className={`md:hidden p-2 bg-blue-500 text-white rounded absolute top-4 left-4 z-50`}
            >
                {isSidebarOpen ? 'Close' : 'Open'}
            </button>

            {/* Sidebar */}
            <div className={`transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 w-64 bg-base-200 min-h-screen fixed md:relative z-40`}>
                <ul className="menu rounded-box p-5">
                    {isAdmin && isAdmin.admin ? (
                        <>
                            <li>
                                <Link to="/dashboard/adminProfile" className="flex items-center">
                                    <MdOutlineAdminPanelSettings />
                                    Admin Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/manageUsers" className="flex items-center">
                                    <MdManageAccounts />
                                    Manage Users
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/allMeals" className="flex items-center">
                                    <MdNoMeals />
                                    All Meals
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/addMeals" className="flex items-center">
                                    <MdFormatListBulletedAdd />
                                    Add Meals
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/serveMeals" className="flex items-center">
                                    <AiOutlineCloudServer />
                                    Serve Meal
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/allReviews" className="flex items-center">
                                    <VscOpenPreview />
                                    All Reviews
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/upcoming" className="flex items-center">
                                    <MdOutlineUpcoming />
                                    Upcoming
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/dashboard/userHome" className="flex items-center">
                                    <FaHouseUser />
                                    My Profile
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/request_meal' className="flex items-center">
                                    <CiSquareQuestion />
                                    Requested Meals
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/my_comment' className="flex items-center">
                                    <VscOpenPreview />
                                    My Reviews
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
                <div className="divider divider-info">Or</div>
                <ul className="menu rounded-box p-5">
                    <li>
                        <Link to='/' className="flex items-center">
                            <FaHome />
                            Back To Home
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Dashboard Content */}
            <div className={`flex-1 p-5 md:p-8 bg-base-100 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} `}>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
