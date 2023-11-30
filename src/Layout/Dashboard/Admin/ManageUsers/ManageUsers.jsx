import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import PageHelmet from "../../../../Hooks/pageHelmet";


const ManageUsers = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const axiosSecure = useAxiosSecure();

    const { data: userData = [], refetch } = useQuery({
        queryKey: ['userData', searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get('/user/admin', {
                params: { username: searchQuery, email: searchQuery },
            });
            return res.data;
        },
    });


    // Function to handle serving a meal
    const handleIsAdmin = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                const adminInfo = {
                    role: 'admin'
                };
                axiosSecure.patch(`/user/admin/${id}`, adminInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Make Admin",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                        }
                    })
                    .catch(err => console.log(err.message));
            }
        });

    };



    return (
        <div>
            <h2 className='text-center text-3xl py-5 font-bold'>Manage User</h2>
            <PageHelmet title='Manage Users'></PageHelmet>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table data-aos="fade-up" className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Package
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
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
                        userData?.map(user => <tr data-aos="fade-up" key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={user?.photoURL} alt={user?.name} />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user?.name}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user?.email}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user?.package || 'Bronze'}
                            </th>
                            <td className="px-6 py-4">
                                {user?.role}
                            </td>

                            <td className="px-6 py-4">
                                {
                                    user?.role === 'admin' ? <span className='text-green-500'>isAdmin</span> : <button onClick={() => handleIsAdmin(user?._id, user?.role)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Make Admin</button>
                                }
                            </td>
                        </tr>)
                    }

                </table>
            </div>
        </div>

    );
};

export default ManageUsers;

