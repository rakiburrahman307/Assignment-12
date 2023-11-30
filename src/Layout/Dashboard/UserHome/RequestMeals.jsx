import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { BiSolidLike } from "react-icons/bi";
import PageHelmet from "../../../Hooks/pageHelmet";
import Swal from "sweetalert2";

const RequestMeals = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: reqMeals = [], refetch } = useQuery({
        queryKey: ['request-meals'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/req_meal/${user?.email}`);
            return res.data;
        }
    })
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/req_meal/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Cancelled!",
                                text: "Your order has been cancelled",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
                    .catch(err => console.log(err.message));
            }
        });
    }
    return (
        <div>
            <h2 className='text-center text-3xl py-5 font-bold'>Requested Meals</h2>
            <PageHelmet title='Request Meals'></PageHelmet>
            <div className="overflow-x-auto">
                <table data-aos="fade-up" className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Meal Type</th>
                            <th>Ingredients</th>
                            <th>Price</th>
                            <th>Likes</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            reqMeals.map((meal) => (
                                <tr data-aos="fade-up" key={meal._id}>

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
                                    <th>
                                        {
                                            meal?.status === 'delivered' ? <p className="text-green-500">done</p> : <button onClick={() => handleDelete(meal?._id)} className="font-medium text-red-600 dark:text-blue-500 hover:underline">Cancel</button>

                                        }
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