
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import PageHelmet from '../../../../Hooks/pageHelmet';

const ServeMeals = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const axiosSecure = useAxiosSecure();

    const { data: requestedMeals = [], refetch } = useQuery({
        queryKey: ['requestedMeals', searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get('/requested_meals', {
                params: { username: searchQuery, email: searchQuery },
            });
            return res.data;
        },
    });

    // Function to handle serving a meal
    const handleServeMeal = (mealId, status) => {
        if (status === 'delivered') {
            toast.warning('Meal is already served');
        } else {
            const info = {
                status: 'delivered'
            };

            axiosSecure.patch(`/req_meal_status/${mealId}`, info)
                .then(res => {
                    if (res.data.modifiedCount) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Meal Serve",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
                .catch(err => console.log(err.message));
        }
    };



    return (
        <div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <h2 className='text-center text-3xl py-5 font-bold'>Serve Meal</h2>
                <PageHelmet title='Serve Meals'></PageHelmet>
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
                                Customer Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Customer Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
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
                                {meal?.customerName}
                            </td>
                            <td className="px-6 py-4">
                                {meal?.customerEmail}
                            </td>
                            <td className="px-6 py-4">
                                {meal?.status}
                            </td>
                            <td className="px-6 py-4">
                                {
                                    meal.status === 'delivered' ? <span className='text-green-500'>Done</span> : <button onClick={() => handleServeMeal(meal._id, meal.status)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Serve</button>
                                }
                            </td>
                        </tr>)
                    }

                </table>
            </div>
        </div>

    );
};

export default ServeMeals;
