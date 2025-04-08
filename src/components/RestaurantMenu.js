import { useState } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu.js";
import MenuItem from "./MenuItem.js";
import { MenuShimmer } from "./Shimmer.js";
import { useParams } from "react-router";

import { resImageURL } from "../utils/constants.js";
import starIcon from "../assets/star-rating.svg";
import arrowUpIcon from "../assets/arrowUp.svg";
import arrowDownIcon from "../assets/arrowDown.svg";

import { MENU_ITEM_TYPE_KEY } from "../utils/constants.js";
import { resImageURL } from "../utils/constants.js";

const RestaurantMenu = () => {
    const {resId} = useParams();
    const resInfo = useRestaurantMenu(resId);
    const [showItems, setShowItems] = useState(true);
    /*const [showDescription, setShowDescription] = useState(null);
    const [cartItems, setCartItems] = useState([]);*/

    function handleClick() {
        setShowItems(!showItems);
    }
    function toggleIcon(boolean) {
        return boolean === true ? arrowUpIcon : arrowDownIcon;
    }

    /*function returnVegIcon(classifier) {
        return classifier === "VEG" ? vegIcon : nonVegIcon;
    }
    function returnBestseller(boolean) {
        return boolean === true ? "Bestseller" : ""
    }*/

    const restaurantHeadInfo = resInfo?.cards?.[2]?.card?.card?.info;
    const {
        name, 
        cuisines, 
        costForTwoMessage, 
        avgRating,
        totalRatingsString, 
        areaName, 
        sla,
        cloudinaryImageId
    } = restaurantHeadInfo || {};

    const menuItemsData = resInfo?.cards.find(x => x.groupedCard)?.
                        groupedCard?.cardGroupMap?.REGULAR?.
                        cards?.map(x => x.card?.card)?.
                        filter(x => x[`@type`] === MENU_ITEM_TYPE_KEY)?.
                        map(x => x.itemCards).flat().map(x => x.card?.info) || [];

    const uniqueMenuItems = [];
    menuItemsData.forEach((item) => {
        if(!uniqueMenuItems.find(x => x.id === item.id)) {
            uniqueMenuItems.push(item);
        }
    })
    console.log(uniqueMenuItems);

    const returnBgColor = (rating) => {
        return rating >= 4 ? "#00ad1d" : "#ec3838";
    };

    return resInfo === null ? (
        <MenuShimmer />
    ) : (
        <div className="restaurant-menu flex flex-col justify-center items-center mx-auto mb-18 max-w-[50%] h-max">
            <div className="header flex justify-start items-center bg-[#333333] mb-2.5 w-full">
                <div className="image-div flex">
                    <img src={`${resImageURL}${cloudinaryImageId}`} draggable="false" alt="restaurant-icon" className="res-image w-[250px] h-44 rounded-[5px] m-5" loading="lazy" />
                </div>
                <div className="restaurant-details flex flex-col justify-center items-start text-[#eaeaea] m-5 font-[PT Sans, Calibri, sans-serif]">
                    <h1 className="text-[40px] font-medium">
                        {name}
                    </h1>
                    <p className="text-[15px] text-center font-light">{cuisines.join(", ")}</p>

                    <div className="flex justify-start items-center text-lg font-semibold">
                        <div className="res-rating w-fit gap-0.5 rounded-lg flex justify-center items-center m-2 px-1.5 py-0.5"
                            style={{backgroundColor: returnBgColor(avgRating)}}
                        >
                            <img src={starIcon} alt="rating-icon" className="size-[22px]"/>
                            <p>{avgRating} </p>
                        </div>
                        <p>{totalRatingsString}</p>
                    </div>

                    <div className="flex justify-center items-center gap-1.5 font-semibold">
                        <p>{sla?.minDeliveryTime}-{sla?.maxDeliveryTime} mins </p>
                        <p> | {costForTwoMessage}</p>
                    </div>
                
                    <p className="font-medium">Outlet: {areaName}</p>
                </div>
            </div>
            <div className="body flex flex-col justify-center items-center w-full mt-5">
                <div className="flex w-full justify-between items-center border-b-4 border-solid border-b-gray-200">
                    <div className="carousel-name w-full flex justify-start items-center p-5 pl-0 gap-2">
                        <h2 className="text-lg font-semibold">
                            Recommended
                        </h2>
                        <p className="font-medium text-[16px] text-[#545454]">
                            ({uniqueMenuItems.length} Items)
                        </p>
                    </div>
                    <div className="toggle-btn flex justify-end items-center w-full">
                        <button onClick={handleClick} className="cursor-pointer hover:scale-[1.2]">
                            <img src={toggleIcon(showItems)} alt="toggle-icon" draggable="false" />
                        </button>
                    </div>
                </div>

                {uniqueMenuItems.map((item) => (
                    <MenuItem key={item?.id} item={item} showItems={showItems} />
                ))}

            </div>
        </div>
    );
};

export default RestaurantMenu;