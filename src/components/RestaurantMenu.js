import { useState } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu.js";
import { MenuShimmer } from "./Shimmer.js";
import { useParams } from "react-router";

import { resImageURL } from "../utils/constants.js";
import starIcon from "../assets/star-rating.svg";
import vegIcon from "../assets/veg.svg";
import nonVegIcon from "../assets/non-veg.svg";
import arrowUpIcon from "../assets/arrowUp.svg";
import arrowDownIcon from "../assets/arrowDown.svg";

import { MENU_ITEM_TYPE_KEY } from "../utils/constants.js";
import { resImageURL } from "../utils/constants.js";

const RestaurantMenu = () => {
    const {resId} = useParams();
    const resInfo = useRestaurantMenu(resId);
    const [showItems, setShowItems] = useState(true);
    const [showDescription, setShowDescription] = useState(null);

    function handleClick() {
        setShowItems(!showItems);
    }
    function toggleIcon(boolean) {
        return boolean === true ? arrowUpIcon : arrowDownIcon;
    }

    function returnVegIcon(classifier) {
        return classifier === "VEG" ? vegIcon : nonVegIcon;
    }
    function returnBestseller(boolean) {
        return boolean === true ? "Bestseller" : ""
    }

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
                    <div key={item?.id} 
                        className={`${showItems ? "expanded" : "collapsed"} menu-item flex justify-between items-center border-b-4 border-b-[#aaa] border-solid m-2.5 py-2.5 min-h-max w-full`}
                    >
                        <div className="w-3/4 flex flex-col justify-center items-start flex-wrap text-[#545454] h-max mr-[5px] py-3">
                            <div className="flex justify-start items-center mt-1 gap-2.5">
                                <img src={returnVegIcon(item?.itemAttribute?.vegClassifier)} alt={item?.itemAttribute?.vegClassifier} />
                                <p className="text-red-500 italic font-medium">
                                    {returnBestseller(item?.isBestseller)}
                                </p>
                            </div>
                            <h3 className="text-lg font-semibold">
                                {item?.name}
                            </h3>
                            <p className="text-[16px] p-0.5 font-medium">
                                ₹{(item?.price || item?.defaultPrice || item?.cost)/100}
                            </p>
                            {item?.ratings?.aggregatedRating &&
                                typeof item?.ratings?.aggregatedRating === "object" &&
                                Object.keys(item?.ratings?.aggregatedRating).length > 0 ? (
                                <div className="flex justify-start items-center gap-2">
                                    <div className="item-rating flex justify-start items-center px-1 py-0.5 rounded-[5px] text-white"
                                        style={{backgroundColor: returnBgColor(item?.ratings?.aggregatedRating?.rating)}}
                                    >
                                        <img src={starIcon} alt="rating-icon"/>
                                        <p>{item?.ratings?.aggregatedRating?.rating}</p>
                                    </div>
                                    <p>
                                    ({item?.ratings?.aggregatedRating?.ratingCountV2})
                                    </p>
                                </div>
                            ) : null}

                            <div className="w-full h-full flex flex-col items-start justify-center">
                                <button onClick={() => setShowDescription(showDescription === item?.id ? null : item?.id)}
                                    className="description-btn cursor-pointer border-2 border-solid border-gray-300 px-1.5 py-0.5 mt-1.5 rounded-xl transition hover:bg-gray-200"
                                >
                                    {showDescription === item?.id ? "Hide Description" : "See Description"}
                                </button>

                                {showDescription === item?.id && (
                                    <div className="description flex flex-wrap flex-col justify-center items-start w-full">
                                        <p className="mt-2.5 text-[16px] font-light">
                                            {item?.description || "No description available"} 
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="img-add-div w-80 flex flex-col items-end justify-center h-full">
                            <img src={`${resImageURL}${item?.imageId}`} alt={item?.name} className="size-[100px] rounded-[5px] m-0.5" draggable="false" loading="lazy" />
                            
                            <button className="add-btn text-lg rounded-[5px] bg-gray-300 py-1.5 px-4 my-2.5 cursor-pointer w-[100px] text-black hover:bg-gray-100 transition">
                                ADD +
                            </button>
                            
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
};

export default RestaurantMenu;