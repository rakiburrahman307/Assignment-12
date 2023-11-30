import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const CheckOut = ({ plan }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: plan?.price })
            .then(res => {
                setClientSecret(res?.data?.clientSecret);
            })
            .catch(err => {
                console.error("Error fetching client secret:", err);
            });
    }, [axiosSecure, plan?.price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        const card = elements.getElement(CardElement);

        try {
            const { error } = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });

            if (error) {
                throw new Error(error.message);
            }

            setError('');

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    },
                }
            });

            if (confirmError) {
                throw new Error(confirmError.message);
            }

            if (paymentIntent.status === 'succeeded') {
                const userInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                    package: plan?.name,
                    transactionID: paymentIntent?.id,
                    price: plan?.price
                };

                axiosSecure.post('/confirmPlans', userInfo)
                    .then((res) => {
                     if (res?.data) {
                        const adminInfo = {
                            package: plan?.name
                        };

                        axiosSecure.patch(`/user_package/${user?.email}`, adminInfo)
                            .then(() => {
                                setTransactionId(paymentIntent?.id);
                                toast.success('Payment Success');
                                navigate(location?.state || '/');
                            })
                            .catch(adminError => {
                                console.error("Error updating admin package:", adminError);
                                toast.error('Payment Error');
                            });
                     }
                    })
                    .catch(confirmError => {
                        console.error("Error confirming plans:", confirmError);
                        toast.error('Payment Error');
                    });
            } else {
                setTransactionId('');
                toast.error('Payment Error');
            }
        } catch (error) {
            console.error("Payment error:", error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100 mx-auto py-10">
            <form className="card-body" onSubmit={handleSubmit}>
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
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || loading}>
                    {loading ? 'Processing...' : 'Pay'}
                </button>
            </form>
            {error && <p className="text-red-600 text-center">{error}</p>}
            {transactionId && <p className="text-green-600 text-center">{transactionId}</p>}
        </div>
    );
};

CheckOut.propTypes = {
    plan: PropTypes.object,
};

export default CheckOut;
