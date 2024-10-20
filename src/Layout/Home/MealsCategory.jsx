import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useEffect, useState } from "react";
import "./styleTab.css";
import MealsCard from "./MealsCard";
import MealsCardSkeleton from "./MealsCardSkeleton";

const MealsCategory = () => {
  const [types, setTypes] = useState([]);
  const axiosPublic = useAxiosPublic();

  // Fetch meal types
  useEffect(() => {
    fetch("/type.json")
      .then((res) => res.json())
      .then((data) => setTypes(data))
      .catch((error) => {
        console.error("Error fetching meal types:", error);
      });
  }, []);

  // Fetch all meals using React Query
  const {
    data: carts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all_data"],
    queryFn: async () => {
      const res = await axiosPublic("/all_meals");
      return res?.data;
    },
  });

  // Filter meals based on meal type
  const breakFast = carts
    ? carts.filter((cart) => cart.mealType === "breakfast")
    : [];
  const lunch = carts ? carts.filter((cart) => cart.mealType === "lunch") : [];
  const dinner = carts
    ? carts.filter((cart) => cart.mealType === "dinner")
    : [];

  // Render either skeletons or actual meal cards
  const renderCards = (meals) => {
    if (isLoading) {
      // Display 3 skeleton cards while loading
      return Array(6)
        .fill(0)
        .map((_, index) => <MealsCardSkeleton key={index} />);
    }
    return meals?.map((cart) => <MealsCard key={cart?._id} carts={cart} />);
  };

  return (
    <div>
      {isError ? <p>Error fetching data</p> : ""}

      <Tabs>
        <TabList>
          {types?.map((type) => (
            <Tab key={type?.id}>{type?.type}</Tab>
          ))}
        </TabList>

        {/* All Meals Tab */}
        <TabPanel>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-6'>
            {renderCards(carts)}
          </div>
        </TabPanel>

        {/* Breakfast Tab */}
        <TabPanel>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-6'>
            {renderCards(breakFast)}
          </div>
        </TabPanel>

        {/* Lunch Tab */}
        <TabPanel>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-6'>
            {renderCards(lunch)}
          </div>
        </TabPanel>

        {/* Dinner Tab */}
        <TabPanel>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-6'>
            {renderCards(dinner)}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MealsCategory;
