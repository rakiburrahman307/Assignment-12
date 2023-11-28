import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useIsAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data;
        }
    });

    // Ensure data exists before destructuring
    const isAdmin = data?.isAdmin;

    // Return the isAdmin value directly
    return [isAdmin]
};

export default useIsAdmin;
