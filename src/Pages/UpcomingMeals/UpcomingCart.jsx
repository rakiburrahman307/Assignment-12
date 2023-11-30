
import PropTypes from 'prop-types';


const UpcomingCart = ({ cart }) => {
    const { mealType, mealImage, adminName, ingredients, price } = cart;

    return (


        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={mealImage} alt={mealType} />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Type: {mealType}</h2>
                <h5 className=" text-xl font-bold tracking-tight text-gray-900 dark:text-white">Distributer: {adminName}</h5>
                <p className=" font-normal text-gray-700 dark:text-gray-400">Ingredients: {ingredients}</p>
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${price}</span>

            </div>
        </div>


    );
};

UpcomingCart.propTypes = {
    cart: PropTypes.object,
    handleLike: PropTypes.func,

};

export default UpcomingCart;