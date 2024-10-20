import UpcomingCart from "./UpcomingCart";

import useUpcomingCarts from "../../Hooks/useUpcomingCarts";

const UpcomingMeals = () => {
  const [carts] = useUpcomingCarts();

  return (
    <div>
      <h2 className='text-3xl text-center font-bold py-10'>Upcoming Meals</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-5'>
        {carts.map((cart) => (
          <UpcomingCart key={cart._id} cart={cart}></UpcomingCart>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeals;
