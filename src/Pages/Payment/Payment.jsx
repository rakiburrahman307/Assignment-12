import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "../CheckOut/CheckOut";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";


// STRIPE publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_ID);

const Payment = () => {
  const plan = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const handleNagadPayment = (id) => {
    setIsLoading(true);
    const details = {
      userName: user?.displayName,
      userEmail: user?.email,
      id,  
    }
    axiosSecure
      .post(`/nagad-checkout`, { details })
      .then((res) => {
        window.location.replace(res?.data?.nagadURL)
      })
      .catch((err) => {
        console.error("Error", err);
      });
      setIsLoading(false);
  }
  const handleBkashPayment = (id) => {
    setIsLoading(true);
    const details = {
      userName: user?.displayName,
      userEmail: user?.email,
      id,  
    }
    axiosSecure
      .post(`/bkash-checkout`, { details })
      .then((res) => {
        window.location.replace(res?.data?.bkashURL)
      })
      .catch((err) => {
        console.error("Error", err);
      });
      setIsLoading(false);
  }


  const handlePayment = (id) => {
    setIsLoading(true);
    const info = {
      id: id,
      userName: user?.displayName,
      userEmail: user?.email,

    }

    axiosSecure
      .post(`/payment/ssl`, { info })
      .then((res) => {
        window.location.replace(res?.data?.url)
      })
      .catch((err) => {
        console.error("Error", err);
      });
      setIsLoading(false);
  };
  return (
    <div className="flex flex-col gap-10 w-full">
      <h2 className="text-3xl text-center font-bold">Stripe Payment Gateway</h2>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOut plan={plan}></CheckOut>
        </Elements>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold">Bangladesh Payment Gateway SSL</h2>
        <div className="flex justify-center items-center h-32 mt-10 bg-white border-2 w-1/3 shadow-2xl rounded-xl">
          <button
            onClick={() => handlePayment(plan?._id)}
            className="bg-blue-700 p-5 rounded-lg border-2 text-white hover:bg-blue-800 hover:duration-500 hover:text-blue-100"
          >
           {isLoading ? 'Processing...' : 'Pay with SSL'}
          </button>
          <div>
            <button className="bg-blue-700 p-5 rounded-lg border-2 text-white hover:bg-blue-800 hover:duration-500 hover:text-blue-100" onClick={() => handleBkashPayment(plan?._id)}>  {isLoading ? 'Processing...' : 'Pay with Bkash'}</button>
          </div>
          <div>
            <button className="bg-blue-700 p-5 rounded-lg border-2 text-white hover:bg-blue-800 hover:duration-500 hover:text-blue-100" onClick={() => handleNagadPayment(plan?._id)}>  {isLoading ? 'Processing...' : 'Pay with Nagad'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
