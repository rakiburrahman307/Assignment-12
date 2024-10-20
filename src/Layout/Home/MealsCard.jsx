import PropTypes from "prop-types";
import { useState } from "react";
import ReactStarsRating from "react-awesome-stars-rating";
import { SlLike } from "react-icons/sl";
import { Link } from "react-router-dom";

const MealsCard = ({ carts }) => {
  const {
    _id,
    mealTitle,
    mealType,
    mealImage,
    adminName,
    rating,
    likes,
    price,
  } = carts;

  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      data-aos='fade-up'
      className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
    >
      <div className='p-1 h-60'>
        <img
          className={`rounded-t-lg w-full h-full object-cover transition-all duration-700 ease-in-out ${
            isLoaded ? "blur-0" : "blur-lg"
          }`}
          src={mealImage}
          alt={mealType}
          loading='lazy'
          onLoad={handleImageLoad}
        />
      </div>

      <div className='px-2 mt-5 pb-2'>
        <h5 className='text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
          Title: {mealTitle}
        </h5>
        <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
          Type: {mealType}
        </h5>
        <h4 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
          Meal Distributor: {adminName}
        </h4>

        <div className='flex items-center mt-2.5 mb-5'>
          <div className='flex items-center space-x-1 rtl:space-x-reverse'>
            <ReactStarsRating className='flex' value={rating} />
          </div>
        </div>

        <div className='flex items-center mt-2.5 mb-5'>
          <button className='bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3 flex gap-2'>
            <SlLike /> {likes}
          </button>
        </div>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-3xl font-bold text-gray-900 dark:text-white'>
            ${price}
          </span>
          <Link to={`/detail/${_id}`}>
            <button className='rounded-lg border-[1px] border-sky-500 px-5 py-1 text-lg text-sky-500 duration-200 hover:bg-sky-500 hover:text-white'>
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

MealsCard.propTypes = {
  carts: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    mealTitle: PropTypes.string.isRequired,
    mealType: PropTypes.string.isRequired,
    mealImage: PropTypes.string.isRequired,
    adminName: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default MealsCard;
