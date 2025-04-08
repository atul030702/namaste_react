import { shimmer_resCard_unit, shimmer_menuCard_unit } from "../utils/constants";

const CardShimmer = () => {
    return (
        <div className="shimmer flicker w-[285px] h-[300px] flex flex-col justify-center items-center bg-gray-400 p-2.5 rounded-xl gap-1">
            <div className="flicker w-full h-[185] rounded-xl bg-gray-100"></div>
            <h3 className="flicker w-full h-[35px] bg-gray-100"></h3>
            <div className="flicker w-full h-[35px] bg-gray-100"></div>
            <div className="flicker w-full h-[25px] bg-gray-100"></div>
        </div>
    );
};

export const MenuShimmer = () => {
    return (
        <div className="menu-shimmer flicker flex flex-col w-[50%] justify-between items-start bg-gray-50 mx-auto">
            <div className="flicker w-full h-55 flex justify-start items-center mb-2.5 bg-gray-400">
                <div className="flicker w-62 h-44 rounded-[5px] m-4 bg-gray-100"></div>
                <div className="flicker flex flex-col m-5 h-44 w-63 bg-gray-200">
                    <div className="flicker w-full h-15 bg-gray-50"></div>
                    <div className="flicker w-full h-5 bg-gray-50"></div>
                    <div className="flicker w-full h-12 bg-gray-50"></div>
                    <div className="flicker w-full h-6 bg-gray-50"></div>
                    <div className="flicker w-full h-6 bg-gray-50"></div>
                </div>
            </div>
            <div className="flicker flex flex-col justify-center items-start w-full mt-5 bg-gray-100">
                <div className="flicker ml-1 mb-1 flex flex-col w-30 p-5 pl-0 h-23 bg-gray-200"></div>
                {Array(shimmer_menuCard_unit).fill("").map((_, index) => (
                    <div key={index.toString() + 1} className="flicker w-full h-[150px] mb-2.5 flex bg-gray-200 gap-2.5 justify-between items-center">
                        <div className="flex flex-col w-[745px] flicker h-36 bg-gray-300">
                            <div className="w-full h-14 flicker bg-gray-50 m-1.5"></div>
                            <div className="flicker w-full h-24 mt-1 bg-gray-50"></div>
                        </div>
                        <div className="flicker rounded-[5px] w-25 h-36 p-1 bg-gray-50"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const Shimmer = () => {
    return (
        <div className="flex flex-grow w-full justify-between items-center flex-wrap gap-5 m-4 p-2">
            {Array(shimmer_resCard_unit).fill("").map((_, index) => (
                <CardShimmer key={index.toString() + 1} />
            ))}
        </div>
    );
};

