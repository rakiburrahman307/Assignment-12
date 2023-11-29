import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import PageHelmet from "../../../Hooks/pageHelmet";

const UserHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: userProfile = [] } = useQuery({
        queryKey: ['userPro'],
        queryFn: async () => {
            const res = await axiosSecure.get(`plansConfirm/${user?.email}`);
            return res.data;
        }
    })
    return (
        <div className="">
            <PageHelmet title='User Home'></PageHelmet>
            <div className="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">

                <div className="flex flex-col items-center pb-10">
                <div className="avatar relative">
      <div className="w-24 rounded-full ">

       {
        userProfile?.package ?  <div className="absolute top-0 left-0 bg-orange-500 text-white p-1 rounded-full">{userProfile?.package}</div>: <div className="absolute top-0 left-0 bg-red-500 text-white p-1 rounded-full">Bronze</div>
       }

        <img src={userProfile?.photoURL || user?.photoURL} alt="User Profile" />
      </div>
    </div>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userProfile?.name || user?.displayName}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{userProfile?.email || user?.email}</span>
                </div>
            </div>
        </div>

    );
};

export default UserHome;