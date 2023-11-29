import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useIsAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: isAdmin, isLoading : isAdminLoading } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data;
        }
    });

    // Return the isAdmin value directly
    return [isAdmin,isAdminLoading]
};

export default useIsAdmin;
