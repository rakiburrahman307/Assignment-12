import { Link, Outlet } from "react-router-dom";
import { VscOpenPreview } from "react-icons/vsc";
import { CiSquareQuestion } from "react-icons/ci";
import { FaHome, FaHouseUser } from "react-icons/fa";
// import useIsAdmin from "../../Hooks/useIsAdmin";


const Dashboard = () => {
    // const [isAdmin] = useIsAdmin();
    const isAdmin = false;
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-base-200">
                <ul className="menu rounded-box">
                    {
                        isAdmin ? <>

                            <li>
                                <Link to="/dashboard/userHome">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                    Admin
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Requested Meals
                                </Link>
                            </li>
                            <li>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                    My Reviews
                                </a>
                            </li>

                        </>
                            :
                            <>
                                <ul className="menu bg-base-200 w-56 rounded-box">
                                <li>
                                <Link to="/dashboard/userHome">
                                    <FaHouseUser/>
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