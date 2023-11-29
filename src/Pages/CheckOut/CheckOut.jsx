import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";


const CheckOut = ({ plan }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth()
    const stripe = useStripe();
    const elements = useElements();
    const { price, name } = plan;

    const axiosSecure = useAxiosSecure();


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {

                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, price]);
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe && !elements) {
            return
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {

            setError(error.message);
        } else {
            
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'

                }
            }
        })
        if (confirmError) {
            console.log(confirmError.message);
        } else {
            if (paymentIntent.status === 'succeeded') {
                const info = {
                    name: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                    package: name,
                    transactionID: paymentIntent?.id,
                    price: price
                }
                axiosSecure.post('/confirmPlans',info)
                .then(() =>{
                    setTransactionId(paymentIntent?.id);
                    toast.success('Payment Success');
                    navigate(location?.state ? location.state : '/');
                    
                })
                .catch(err =>confirmError(err.message));
                
            } else {
                setTransactionId('');
                toast.error('Payment Error');
            }
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe && !clientSecret}>
                    Pay
                </button>
            </form>
            <p className="text-red-600">{error}</p>
            <p className="text-green-600">{transactionId}</p>
        </div>
    );
};
CheckOut.propTypes = {
    plan: PropTypes.object,

};
export default CheckOut;