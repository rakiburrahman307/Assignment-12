import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUpcomingCarts = () => {
    const axiosPublic = useAxiosPublic();
    // Fetch all meals using React Query
    const { data: carts = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['upcoming_data'],
        queryFn: async () => {
            const res = await axiosPublic.get("/upcoming");
            return res.data;
        }
    });
    return [carts, refetch, isLoading, isError]
};

export default useUpcomingCarts;