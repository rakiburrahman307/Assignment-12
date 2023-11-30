
import Footer from "../Fotter/Footer";
import Banner from "./Banner";
import FeaturedContent from "./FeaturedContent";
import MealsCategory from "./MealsCategory";
import OurPlans from "./OurPlans";



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <MealsCategory></MealsCategory>
            <OurPlans></OurPlans>
            <FeaturedContent></FeaturedContent>
            <Footer></Footer>
        </div>
    );
};

export default Home;