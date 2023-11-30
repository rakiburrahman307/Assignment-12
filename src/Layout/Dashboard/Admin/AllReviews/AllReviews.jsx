import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import PageHelmet from "../../../../Hooks/pageHelmet";


const AllReviews = () => {
    const axiosSecure = useAxiosSecure()
    const { data: totalData, refetch } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const res = await axiosSecure("/all_meals");
            return res.data;
        }
    });
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
                axiosSecure.delete(`/allMeal/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
                    .catch(err => console.log(err.message));
            }
        });
    }
    return (
        <div>
            <h2 className='text-center text-3xl font-bold'>All Reviews</h2>
            <PageHelmet title='Review py-5'></PageHelmet>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table data-aos="fade-up" className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Meal Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Meal Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Likes
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Review Count
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            totalData?.map(cart => <tr data-aos="fade-up" key={cart._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={cart?.mealImage} alt={cart?.mealType} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {cart?.mealType}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {cart?.mealTitle}
                                </th>
                                <td className="px-6 py-4">
                                    {cart?.likes}
                                </td>
                                <td className="px-6 py-4">
                                    {cart?.reviews?.map((count, idx) => (
                                        <p key={idx}>{Array.isArray(count) ? count.length + 1 : 0}</p>
                                    ))}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDelete(cart?._id)} className="mr-2 font-medium text-red-500 dark:text-blue-500 hover:underline">Delete</button>
                                    <Link to={`/detail/${cart?._id}`} className=" font-medium text-blue-600 dark:text-blue-500 hover:underline">Details</Link>
                                </td>
                            </tr>)
                        }



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReviews;