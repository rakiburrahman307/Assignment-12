import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import MealsCard from "../../Layout/Home/Mealscard";


const Meals = () => {
    const axiosPublic = useAxiosPublic();
    // Fetch all meals using React Query
    const { data: carts, isLoading, isError } = useQuery({
        queryKey: ['all_data'],
        queryFn: async () => {
            const res = await axiosPublic("/all_meals");
            return res.data;
        }
    });
    return (
        <div>
            {isLoading && <span className="loading ml-[700px] loading-dots loading-lg"></span>}
            {isError && <p>Error fetching data</p>}
            <h2 className="text-3xl font-bold p-8 text-center">All Meals</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-6'>
                {
                    carts && carts.map(cart => <MealsCard key={cart._id} carts={cart}></MealsCard>)
                }
            </div>

        </div>
    );
};

export default Meals;







