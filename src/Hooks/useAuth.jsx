import { useContext } from "react";
import { AuthContext } from "../AuthProvidors/AuthProvider";
const useAuth = () => {
 const auth = useContext(AuthContext);
 return auth;
};

export default useAuth;