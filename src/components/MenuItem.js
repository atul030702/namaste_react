import { useState, useContext } from "react";
import { resImageURL } from "../utils/constants";

import starIcon from "../assets/star-rating.svg";
import vegIcon from "../assets/veg.svg";
import nonVegIcon from "../assets/non-veg.svg";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/cartSlice.js";

const MenuItem = ({ item, showItems }) => {
    const [showDescription, setShowDescription] = useState(null);

    const dispatch = useDispatch();
    const cartLength = useSelector((store) => store.cart.items)


    const returnBgColor = (rating) => {
        return rating >= 4 ? "#00ad1d" : "#ec3838";
    };

    function returnVegIcon(classifier) {
        return classifier === "VEG" ? vegIcon : nonVegIcon;
    }

    function returnBestseller(boolean) {
        return boolean === true ? "Bestseller" : ""
    }

    const handleAddItem = (item) => {
        //Dispatch an action
        dispatch(addItem(item));
    };

    return (
        <div 
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
                {item?.ratings?.aggregatedRating && typeof item?.ratings?.aggregatedRating === "object" &&
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
                            
                <button 
                    className="add-btn text-lg rounded-[5px] bg-gray-300 py-1.5 px-4 my-2.5 cursor-pointer w-[100px] text-black hover:bg-gray-100 transition"
                    onClick={() => handleAddItem(item)}
                >
                    {cartLength.length === 0 ? "ADD +" : `Add ${cartLength.length}+`}
                </button>
                            
            </div>
        </div>
    );
};

export default MenuItem;