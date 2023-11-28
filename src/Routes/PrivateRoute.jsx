import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvidors/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <span className="loading ml-[700px] loading-dots loading-lg"></span>
    }
    else if (user) {
        return children;
    }
    else {
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }

};

PrivateRoute.propTypes = {
    children: PropTypes.node
};

export default PrivateRoute;