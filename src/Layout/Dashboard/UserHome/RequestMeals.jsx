import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { BiSolidLike } from "react-icons/bi";

const RequestMeals = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: reqMeals =[]} = useQuery({
        queryKey:['request-meals'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/req_meal/${user?.email}`);
            return res.data;
        }
    })
    return (
        <div>
             <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Meal Type</th>
                            <th>Ingredients</th>
                            <th>Price</th>
                            <th>Likes</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            reqMeals.map((meal) => (
                                <tr key={meal._id}>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={meal?.mealImage} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{meal?.mealType}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {meal?.ingredients}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{meal?.postTime}</span>
                                    </td>
                                    <td>${meal?.price}</td>
                                    <td className="flex gap-2 items-center"><BiSolidLike></BiSolidLike>{meal?.likes}</td>
                                    <th>
                                        <p>{meal?.status}</p>
                                    </th>
                                </tr>
                            ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestMeals;