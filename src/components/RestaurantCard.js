import starIcon from "../assets/star-rating.svg";
import { resImageURL } from "../utils/constants.js";

const RestaurantCard = (props) => {
    const {resData} = props;
    
    const imageURL = `${resImageURL}${resData?.info?.cloudinaryImageId}`;
    const returnBgColor = (rating) => {
        return rating >= 4 ? "#00ad1d" : "#ec3838";
    };

    return (
        <div className="restaurant-card flex justify-center items-start flex-col m-4 p-2.5 w-[285px] h-min bg-[#f5f5f5] 
            cursor-pointer rounded-xl shadow-[-1px_5px_10px_5px_rgba(112,112,112,0.2)] hover:scale-[0.95] transition"
        >
            <img src={ imageURL } alt="restaurant-food-images"className="w-[275px] h-[185px] rounded-xl"/>

            <h3 className="text-lg font-bold px-1.5 py-1">
                {resData?.info?.name}
            </h3>

            <div className="details flex justify-start p-1 gap-1 w-full text-base font-semibold">
                <div className="ratings flex w-fit h-min mx-1 py-0.5 px-1.5 rounded-lg gap-0.5 text-white"
                    style={{backgroundColor: returnBgColor(resData?.info?.avgRating)}}
                >
                    <img src={starIcon} alt="star-icon" className="size-[22px]"/>
                    <h4>{resData?.info?.avgRating}</h4>
                </div>
                <ul className="flex justify-end items-center mx-1 w-fit gap-x-2.5 px-1">
                    <li>{resData?.info?.sla?.deliveryTime} mins</li>
                    <li>{resData?.info?.costForTwo}</li>
                </ul>
            </div>
            
            <h5 className="cuisine text-[15px] flex flex-wrap px-0.5">
                {resData?.info?.cuisines.join(", ")}
            </h5>
        </div>
    );
};

export default RestaurantCard;