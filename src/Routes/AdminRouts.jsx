import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuth from "../Hooks/useAuth";
import useIsAdmin from "../Hooks/useIsAdmin";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useIsAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <span className="loading ml-[700px] loading-dots loading-lg"></span>
    } else if (user && isAdmin && isAdmin.admin && isAdmin !== undefined) {
        return children;
    } else {
        return <Navigate to="/" state={location.pathname} replace></Navigate>
    }





};
AdminRoute.propTypes = {
    children: PropTypes.node
};
export default AdminRoute;