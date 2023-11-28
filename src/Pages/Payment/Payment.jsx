import { Elements } from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
import CheckOut from '../CheckOut/CheckOut';
import { useLoaderData } from 'react-router-dom';

// STRIPE publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_ID);

const Payment = () => {
    const plan = useLoaderData();
    return (
        <div>
            <h2 className="text-3xl text-center font-bold">Payment</h2>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOut plan={plan}></CheckOut>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
