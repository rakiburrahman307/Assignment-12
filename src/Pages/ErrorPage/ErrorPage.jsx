
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
            <div className="text-center text-white">
                <h1 className="text-5xl font-extrabold mb-4">Oops! Something went wrong.</h1>
                <p className="text-lg mb-6">We apologize, but it seems there was an error.</p>
                <p className="text-lg mb-6">Page is not Found.</p>
                <img src="../../../public/error.svg " alt="Error Illustration" className="mt-8 mx-auto max-w-full h-32" />

                <Link to="/" className="inline-block bg-white text-indigo-500 py-2 px-6 rounded-full mt-8 transition duration-300 hover:bg-indigo-500 hover:text-white">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
