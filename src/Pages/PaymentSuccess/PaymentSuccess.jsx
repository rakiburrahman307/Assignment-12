import { useParams } from "react-router-dom";


const PaymentSuccess = () => {
 const {id} = useParams()
    return (
        <div>
            <h2 className="text-4xl text-center">Payment Done transactionID {id} </h2>
        </div>
    );
};

export default PaymentSuccess;