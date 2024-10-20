import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MealsCardSkeleton = () => {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-8 h-80">
                <Skeleton height={320} />
            </div>
            <div className="px-2 pb-2">
                <Skeleton width="70%" height={30} />
                <Skeleton width="50%" height={15} />
                <Skeleton width="60%" height={15} />
                <div className="flex justify-between items-center mt-4">
                    <Skeleton width={120} height={30} />
                    <Skeleton width={80} height={30} />
                </div>
            </div>
        </div>
    );
};

export default MealsCardSkeleton;
