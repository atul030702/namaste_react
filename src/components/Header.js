import { useState } from "react";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import brandIcon from "../assets/brand-logo.webp";
import cartIcon from "../assets/cart.svg";

const Header = () => {

    const [btnNameReact, setBtnNameReact] = useState("Login");
    const onlineStatus = useOnlineStatus();

    return (
        <div className="header flex w-full h-[100px] bg-white-100 justify-between shadow-lg mb-2">
            <div className="brand-logo flex items-center justify-center w-max">
                <img src={brandIcon} alt="logo" className="logo w-[225px] h-[175px]"/>
            </div>
            <div className="header-text p-2 flex items-center gap-1" >
                <ul className="flex justify-center items-center flex-grow flex-wrap w-full 
                    p-4 m-4 text-[22px] font-semibold text-[#545454] sm:w-full"
                >
                    <li className="px-4 cursor-pointer hover:bg-[#d97919] rounded-xl hover:scale-[1.1] transition">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className="px-4 cursor-pointer hover:bg-[#d97919] rounded-xl hover:scale-[1.1] transition">
                        <Link to="/about">
                            About
                        </Link>
                    </li>
                    <li className="px-4 cursor-pointer hover:bg-[#d97919] rounded-xl hover:scale-[1.1] transition">
                        <Link to="/contact">
                            Contact
                        </Link>
                    </li>

                    <li className="px-4 cursor-pointer hover:bg-[#d97919] rounded-xl hover:scale-[1.1] transition">
                        <img src={cartIcon} alt="cart-icon" className="cart-icon size-8" draggable="false" />
                    </li>

                    <li>
                        <button className="login-btn px-4 hover:bg-[#d97919] rounded-xl hover:scale-[1.1] transition cursor-pointer"
                        onClick={() => {
                            btnNameReact === "Login" 
                                ? setBtnNameReact("Logout") 
                                : setBtnNameReact("Login");
                            }}>
                            { btnNameReact }
                        </button>
                    </li>
                
                </ul>
            </div>
        </div>
    );
}

export default Header;