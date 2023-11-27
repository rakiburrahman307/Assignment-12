import { SlLike } from "react-icons/sl";
import { useLoaderData } from "react-router-dom";
import ReactStarsRating from 'react-awesome-stars-rating';

const Detail = () => {
    const cardData = useLoaderData();
    const { _id, mealType, mealImage, adminName, rating, likes, price, mealDescription, ingredients, postTime} = cardData;

    return (
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
                    <button className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3 flex gap-2"><SlLike /> {likes}</button>
                </div>
                <p className="text-lg">PostTime: {postTime}</p>
                <div className="items-center mb-5">
                <p className="text-lg text-gray-900 dark:text-white">Ingredients: {ingredients}</p>
                <p className="text-lg text-gray-900 dark:text-white">Description: {mealDescription}</p>                </div>
                
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Watch</button>
                </div>
            </div>
        </div>
    );
};

export default Detail;
