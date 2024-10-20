import { lazy } from 'react';
const Footer = lazy(() => import("../Footer/Footer"));
const Banner = lazy(() => import("./Banner"));
const FeaturedContent = lazy(() => import("./FeaturedContent"));
const MealsCategory = lazy(() => import("./MealsCategory"));
const OurPlans = lazy(() => import("./OurPlans"));

const Home = () => {
    return (
        <div className="max-w-[1440px] mx-auto">
            <Banner />
            <MealsCategory />
            <OurPlans />
            <FeaturedContent />
            <Footer />
        </div>
    );
};

export default Home;
