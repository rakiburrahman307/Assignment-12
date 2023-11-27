import PropTypes from 'prop-types';
import ReactStarsRating from 'react-awesome-stars-rating';
import { SlLike } from "react-icons/sl";
import { Link } from 'react-router-dom';

const MealsCard = ({ carts }) => {
    const {_id, mealType, mealImage, adminName, rating, likes, price } = carts;

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="p-8 h-80 rounded-t-lg" src={mealImage} alt={mealType} />

            <div className="px-5 pb-5">
                <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Type: {mealType}</h5>
                <h4 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Meal Distributor: {adminName}</h4>

                <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <ReactStarsRating className='flex' value={rating} />
                    </div>
                </div>

                <div className="flex items-center mt-2.5 mb-5">
                    <button className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3 flex gap-2"><SlLike></SlLike> {likes}</button>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${price}</span>
                    <Link to={`/detail/${_id}`} ><button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Details
                        </button></Link>
                </div>
            </div>
        </div>
    );
};

MealsCard.propTypes = {
    carts: PropTypes.object,

};

export default MealsCard;
