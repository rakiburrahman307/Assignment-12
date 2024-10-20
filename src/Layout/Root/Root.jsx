import  { Suspense, lazy } from "react";
import Spinner from "../../Components/Spinner/Spinner";


const Navbar = lazy(() => import("../Navbar/Navbar"));
const Outlet = lazy(() => import("react-router-dom").then(module => ({ default: module.Outlet })));

const Root = () => {
    return (
        <div className="max-w-[1440px] mx-auto">
            <Suspense fallback={<Spinner />}>
                <Navbar />
                <Outlet />
            </Suspense>
        </div>
    );
};

export default Root;
