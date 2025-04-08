import RestaurantCard from "./RestaurantCard.js";
import listOfRestaurantsJS from "../utils/resList.js";

import { Shimmer } from "./Shimmer.js";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurant] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await listOfRestaurantsJS();
            setListOfRestaurant(data);
            setFilteredRestaurants(data);
        }
        fetchData();
    }, []);

    const onlineStatus = useOnlineStatus();
    if(onlineStatus === false) {
        return <h1>Looks like you are offline! Please check your internet connection...</h1>
    }

    return (
        <div className="body w-full flex-col mb-15">
            <div className="body-header flex items-center justify-between flex-wrap">
                <div className="search-area flex m-4 p-4 pl-0 flex-grow">
                    <input 
                        className="inputbox w-[450px] m-4 mr-0 p-2 text-xl rounded-tl-xl rounded-bl-xl box-border capitalize border-1 border-solid border-[#aabcca] focus:outline-none
                        font-semibold focus:border-[#c26100]"
                        type="text" 
                        placeholder="search for a restaurant or dish..." 
                        value={searchText}  
                        onChange={(e) => {
                            const userInput = e.target.value;
                            setSearchText(userInput);

                            if(userInput.trim() === "") {
                                return setFilteredRestaurants(listOfRestaurants);
                            }else{
                                const filterRestaurant = listOfRestaurants.filter((res) => {
                                    return res?.info?.name.toLowerCase().includes(userInput.toLowerCase().trim()) || 
                                    res?.info?.cuisines?.join("").toLowerCase().includes(userInput.toLowerCase().trim());
                                });
                                setFilteredRestaurants(filterRestaurant);
                            }
                        }
                    }/>

                    <button className="search-btn m-4 ml-0 px-3 rounded-tr-xl rounded-br-xl cursor-pointer bg-[#c26100] hover:bg-[#e73336] text-white" 
                        onClick={() => {
                            const filteredRestaurant = listOfRestaurants.filter((res) => {
                            return res?.info?.name.toLowerCase().trim().includes(searchText.toLowerCase().trim());
                            });
                            setFilteredRestaurants(filteredRestaurant);
                        }}
                    > 
                        Search 
                    </button>
                </div>

                <button 
                className="filter-btn m-2 mr-3.5 px-4 py-2 bg-[#c26100] rounded-xl cursor-pointer font-semibold text-white hover:bg-[#e73336]" 
                onClick={() => {
                    const filteredList = listOfRestaurants.filter(
                        (res) => res?.info?.avgRating > 4.0
                    );
                    setFilteredRestaurants(filteredList);
                }}>
                    Top Rated Restaurants
                </button>
            </div>
            <div className="restaurants flex w-full items-center justify-between flex-wrap">
            
                {listOfRestaurants.length === 0 ? (< Shimmer />) : 
                    (filteredRestaurants.map((restaurant) => (
                        <Link key={restaurant?.info?.id} to={"/restaurant/"+restaurant?.info?.id}> 
                            <RestaurantCard resData={restaurant}/> 
                        </Link>
                    )))
                }
                
            </div>
        </div>
    );
}

export default Body;