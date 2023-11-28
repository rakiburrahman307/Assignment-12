import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { useLoaderData } from "react-router-dom";
import ReactStarsRating from 'react-awesome-stars-rating';
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


const Detail = () => {
    const cardData = useLoaderData();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const customerName = user?.displayName;
    const customerEmail = user?.email;
    const status = 'pending';
    const { _id, mealType, mealImage, adminName, rating, likes, price, mealDescription, ingredients, postTime } = cardData;
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    const mealInfo = { customerName, customerEmail, mealType, mealImage, adminName, rating, likes, price, mealDescription, ingredients, postTime, status }
    const { data: planConfirm = [] } = useQuery({
        queryKey: ['allData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/plansConfirm/${customerEmail}`);
            return res.data;
        }
    });
    const { data: reviewsConfirm = [] } = useQuery({
        queryKey: ['reviewsConfirmData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all_meals/${_id}/reviewConfirm/${customerEmail}`);
            return res.data;
        }
    });
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviewsData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all_meals/${_id}/reviews`);
            return res.data;
        }
    });


    const handleRequestMeal = () => {
        if (!planConfirm) {
            return toast.error('Must Have Perches a Plan First')
        } else {
            axiosSecure.post('/req_meal', mealInfo)
                .then(res => {
                    if (res?.data?.insertedId) {
                        toast.success('Your request successfully send');
                    }
                })
                .catch(err => console.log(err.message));
        }
    }
    const handleComment = (e) => {
        e.preventDefault();
        const text = e.target.textarea.value;
        const comment = {customerName, customerEmail, text }

        if (reviewsConfirm) {
            return toast.warning('You Have Already Comment')
        }else{
            axiosSecure.post(`/all_meals_review/${_id}`, comment)
            .then(() => {
                toast.success('Comment Added successfully');
            })
            .catch(err => {
                console.error(err);
                toast.error('Failed to add comment');
            });
        }

    }
    const handleLike = async () => {
        setLiked((prevLiked) => !prevLiked);
        setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
        try {
            const res = await axiosSecure.post(`/all_meals/${_id}/like`);
            if (res.data) {
                toast.success('Liked')
            }

        } catch (error) {
            console.error('Error updating like count:', error);
        }
    };
    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl">
                <figure><img className="w-96 mx-10" src={mealImage} alt="Meal" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Type: {mealType}</h2>
                    <h4 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Meal Distributor: {adminName}</h4>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${price}</span>

                    <div className="flex items-center mt-2.5 mb-5">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <ReactStarsRating className='flex' value={rating} />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <button onClick={handleLike} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3 flex gap-2">{liked ? <BiSolidDislike /> : <BiSolidLike />} {likeCount}</button>
                    </div>
                    <p className="text-lg">PostTime: {postTime}</p>
                    <div className="items-center mb-5">
                        <p className="text-lg text-gray-900 dark:text-white">Ingredients: {ingredients}</p>
                        <p className="text-lg text-gray-900 dark:text-white">Description: {mealDescription}</p>                </div>
                    <form onSubmit={handleComment}>
                        <div className=" flex w-full mb-4 rounded-lg dark:bg-gray-700 dark:border-gray-600">
                            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                <textarea name="textarea" placeholder="Enter your Comment" className="textarea textarea-bordered textarea-sm w-full max-w-lg " ></textarea>
                            </div>
                            <div className="flex items-center justify-end px-3 py-2 dark:border-gray-600">
                                <button className="btn btn-outline btn-ghost rounded-r-full rounded-t-lg">
                                    Comment
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="card-actions justify-end">
                        <button onClick={handleRequestMeal} className="btn btn-outline btn-ghost">Request Meal</button>
                    </div>
                </div>
            </div>
            <div className="py-10">
                    <h2 className="text-3xl font-bold text-center py-5">Customer Comment</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-5">
                        {
                            reviews.map((review, idx) =>
                            <div key={idx} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{review?.customerName}</h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{review?.text}</p>
                            </div>
                            )
                        }
                    </div>
                </div>
        </div>
    );
};

export default Detail;
