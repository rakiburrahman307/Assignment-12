import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import PageHelmet from "../../../../Hooks/pageHelmet";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const AllMeals = () => {
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(0);
    const [carts, setCarts] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { setLoading } = useAuth();


    useEffect(() => {

        axiosSecure
            .get(`/all_meals/pagination?page=${currentPage}&size=${itemsPerPage}`)
            .then((res) => {
                setCarts(res.data);

            })
            .catch((error) => {
                console.error("Error fetching meals:", error);

            });
    }, [currentPage, itemsPerPage, axiosSecure, setLoading]);


    const { data: totalCount = { count: 0 } } = useQuery({
        queryKey: ['count'],
        queryFn: async () => {
            const res = await axiosSecure("/all_meals_count");
            return res.data;
        }
    });

    const { count } = totalCount;

    const numberOfPages = Math.ceil(Number(count) / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const handleSetPerPage = e => {
        const number = parseInt(e.target.value);
        setItemsPerPage(number);
        setCurrentPage(1);
    }
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }
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
                            const remaining = carts.filter(item => item?._id !== id)
                            setCarts(remaining);
                        }
                    })
                    .catch(err => console.log(err.message));
            }
        });
    }
    return (
        <div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <h2 className='text-center text-3xl font-bold py-5'>All Meals</h2>
                <PageHelmet title='All Meals'></PageHelmet>
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
                                Distributor Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Posted Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rating
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            carts?.map(cart => <tr data-aos="fade-up" key={cart._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                                    {cart?.adminName}
                                </td>
                                <td className="px-6 py-4">
                                    {cart?.postTime}
                                </td>
                                <td className="px-6 py-4">
                                    $ {cart?.price}
                                </td>
                                <td className="px-6 py-4">
                                    {cart?.rating}
                                </td>
                                <td className="px-6 py-4 flex justify-evenly items-center gap-5">
                                    <Link to={`/dashboard/updateMeal/${cart?._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                    <button onClick={() => handleDelete(cart?._id)} className="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</button>
                                </td>
                            </tr>)
                        }



                    </tbody>
                </table>
                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 py-8" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span> of <span className="font-semibold text-gray-900 dark:text-white">{count}</span></span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <div className="join mb-5">
                            <button onClick={handlePrevPage} className="join-item btn">«</button>
                            {
                                pages.map((page, idx) => <button
                                    onClick={() => setCurrentPage(page)}
                                    key={idx} className={currentPage === page ? 'btn-active join-item btn' : 'join-item btn'}>{page}
                                </button>)
                            }
                            <button onClick={handleNextPage} className="join-item btn">»</button>
                            <select value={itemsPerPage} onChange={handleSetPerPage} className="select select-bordered w-full max-w-xs">
                                <option value='5'>5</option>
                                <option value='10'>10</option>
                                <option value='20'>20</option>
                                <option value='50'>50</option>
                                <option value='100'>100</option>

                            </select>
                        </div>
                    </ul>
                </nav>
            </div>

        </div>
    );
};

export default AllMeals;