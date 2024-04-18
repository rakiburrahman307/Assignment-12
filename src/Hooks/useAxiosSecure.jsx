import axios from "axios";
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;