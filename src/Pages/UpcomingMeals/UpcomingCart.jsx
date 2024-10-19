import { useState } from 'react';
import PropTypes from 'prop-types';

const UpcomingCart = ({ cart }) => {
    const { mealType, mealImage, adminName, ingredients, price } = cart;
    const [isLoaded, setIsLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    return (
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img
                className={`object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg transition-all duration-500 ${isLoaded ? 'filter-none' : 'blur-sm'}`}
                src={mealImage}
                alt={mealType}
                loading="lazy"
                onLoad={handleImageLoad}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Type: {mealType}</h2>
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Distributor: {adminName}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">Ingredients: {ingredients}</p>
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${price}</span>
            </div>
        </div>
    );
};

UpcomingCart.propTypes = {
    cart: PropTypes.object.isRequired,
};

export default UpcomingCart;
