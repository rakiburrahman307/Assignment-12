import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from "react";
import MealsCard from "./Mealscard";

const MealsCategory = () => {
    const [types, setTypes] = useState([]);
    const axiosPublic = useAxiosPublic();

    // Fetch meal types
    useEffect(() => {
        fetch('/type.json')
            .then((res) => res.json())
            .then((data) => setTypes(data))
            .catch((error) => {
                console.error('Error fetching meal types:', error);
            });
    }, []);

    // Fetch all meals using React Query
    const { data: carts, isLoading, isError } = useQuery({
        queryKey:  ['all_data'],
        queryFn: async () => {
            const res = await axiosPublic("/all_meals");
            return res.data;
        }
    });

    // Filter meals based on meal type
    const breakFast = carts ? carts.filter(cart => cart.mealType === 'breakfast') : [];
    const lunch = carts ? carts.filter(cart => cart.mealType === 'lunch') : [];
    const dinner = carts ? carts.filter(cart => cart.mealType === 'dinner') : [];

    const handleLike = (id) => {
 console.log(id)
    }
    return (
        <div>
            {isLoading && <span className="loading ml-[700px] loading-dots loading-lg"></span>}
            {isError && <p>Error fetching data</p>}

            <Tabs>
                <TabList>
                    {
                        types.map(type => <Tab key={type.id}>{type.type}</Tab>)
                    }
                </TabList>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-6'>
                        {
                            carts && carts.map(cart => <MealsCard key={cart._id} carts={cart} handleLike={handleLike}></MealsCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-6'>
                        {
                            breakFast.map(cart => <MealsCard key={cart._id} carts={cart} handleLike={handleLike}></MealsCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-6'>
                        {
                            lunch.map(cart => <MealsCard key={cart._id} carts={cart} handleLike={handleLike}></MealsCard>)
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-6'>
                        {
                            dinner.map(cart => <MealsCard key={cart._id} carts={cart} handleLike={handleLike}></MealsCard>)
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default MealsCategory;
