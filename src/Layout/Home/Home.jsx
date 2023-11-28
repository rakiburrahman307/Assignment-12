
import Footer from "../Fotter/Footer";
import Banner from "./Banner";
import OurPlans from "./OurPlans";
import MealsCategory from "./mealsCategory";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <MealsCategory></MealsCategory>
            <OurPlans></OurPlans>
            <Footer></Footer>
       </div>
    );
};

export default Home;