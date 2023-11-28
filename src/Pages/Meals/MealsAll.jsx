import { useState, useEffect } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
const MealList = () => {
    const [meals, setMeals] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            try {
                const response = await axiosSecure.get(`/all_meals/infinite-scroll?page=${page}`);
                setMeals((prevMeals) => [...prevMeals, ...response.data]);
            } catch (error) {
                console.error('Error fetching meals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, [page, axiosSecure]);

    const handleSearch = async () => {
        try {
            const response = await axiosSecure.get(`/all_meals/search/${searchTitle}`);
            setMeals(response.data);
        } catch (error) {
            console.error('Error searching meals:', error);
        }
    };

    const handleFilter = async () => {
        try {
            const response = await axiosSecure.get(`/all_meals/filter?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
            setMeals(response.data);
        } catch (error) {
            console.error('Error filtering meals:', error);
        }
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            <div className='flex justify-evenly items-center'>
                {/* Search Bar */}
                <input className="input input-bordered input-sm w-full max-w-xs" type="text" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
                <button className='btn btn-sm mr-5' onClick={handleSearch}>Search</button>

                {/* Filter */}
                <select className='mr-5' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">None</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </select>
                <input className="input input-bordered input-sm w-full max-w-xs" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min Price" />
                <input className="input input-bordered input-sm w-full max-w-xs" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max Price" />
                <button className='btn btn-sm mr-5' onClick={handleFilter}>Filter</button>

            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Meal Type</th>
                            <th>Ingredients</th>
                            <th>Price</th>
                            <th>Distributer</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            meals.map((meal) => (
                                <tr key={meals._id}>

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
                                    <th>
                                        <p>{meal?.adminName}</p>
                                    </th>
                                </tr>
                            ))}

                    </tbody>
                </table>
            </div>
            <div className='flex justify-center'>
                <button onClick={handleLoadMore} disabled={loading}>
                    {loading ? <span className="loading loading-dots loading-lg"></span> : 'Load More'}
                </button>
            </div>
        </div>
    );
};

export default MealList;
