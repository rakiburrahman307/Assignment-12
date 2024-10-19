
import Footer from "../Footer/Footer";
import Banner from "./Banner";
import FeaturedContent from "./FeaturedContent";
import MealsCategory from "./MealsCategory";
import OurPlans from "./OurPlans";

const Home = () => {
    return (
        <div className="max-w-[1440px] mx-auto">
            <Banner></Banner>
            <MealsCategory></MealsCategory>
            <OurPlans></OurPlans>
            <FeaturedContent></FeaturedContent>
            <Footer></Footer>
        </div>
    );
};

export default Home;