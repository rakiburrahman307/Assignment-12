import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import PageHelmet from "../../../../Hooks/pageHelmet";


const Upcoming = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const axiosSecure = useAxiosSecure();

    const { data: requestedMeals = [], refetch } = useQuery({
        queryKey: ['requestedMeals', searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get('/upcoming_meals', {
                params: { username: searchQuery, email: searchQuery },
            });
            return res.data;
        },
    });


    const handleServeMeal = (meal) => {
        const mealType = meal.mealType;
        const mealTitle = meal.mealTitle;
        const mealImage = meal.mealImage;
        const ingredients = meal.ingredients;
        const mealDescription = meal.mealDescription;
        const price = meal.price;
        const rating = meal.rating;
        const adminName = meal.adminName;
        const gmail = meal.gmail;
        const postTime = new Date().toISOString();
        const likes = meal.likes;
        const reviews = [];
        const mealInfo = { mealType, mealTitle, mealImage, ingredients, mealDescription, price, rating, adminName, gmail, postTime, likes, reviews }

        if (meal?.likes >= 10) {

            axiosSecure.post(`/publishMeal`, mealInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Meal Publish",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
                .catch(err => console.log(err.message));

        } else {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: 'At lest 10 Likes to Publish',
                showConfirmButton: false,
                timer: 1500
            });
            toast.warning()
        }
    };

    return (
        <div>

            <PageHelmet title='Upcoming Meals'></PageHelmet>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                Customer Name
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Likes
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                            <th>
                                {/* Search bar */}
                                <input
                                    className="input input-bordered input-xs w-28"
                                    type="text"
                                    placeholder="Search by username or email"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </th>
                        </tr>
                    </thead>

                    {
                        requestedMeals?.map(meal => <tr key={meal._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={meal?.mealImage} alt={meal?.mealType} />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {meal?.mealType}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {meal?.mealTitle}
                            </th>
                            <td className="px-6 py-4">
                                {meal?.adminName}
                            </td>
                            <td className="px-6 py-4">
                                {meal?.gmail}
                            </td>
                            <td className="px-6 py-4">
                                {meal?.likes}
                            </td>

                            <td className="px-6 py-4">

                                <button onClick={() => handleServeMeal(meal)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Publish</button>

                            </td>
                        </tr>)
                    }

                </table>
            </div>
        </div>

    );
};

export default Upcoming;

