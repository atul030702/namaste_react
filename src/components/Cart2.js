import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice.js";

const Cart2 = () => {
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center m-2.5 p-2">
            <h2 className="text-2xl font-semibold">Your cart is empty 🛒</h2>
            <p className="text-xl">Please add to continue...</p>
        </div>
    ) : (
        <div className="flex flex-col justify-center items-center">
            <h1>Cart Items</h1>
            
            <ul className="flex flex-col mx-auto my-5 w-full gap-2.5 p-2">
                {cartItems.map((item,index) => (
                    <li key={index}
                        className="flex flex-col items-start justify-center border-b-3 border-b-[#aaa] border-solid"
                    >
                        <div className="w-full flex justify-between items-center">
                            <h3 className="text-xl font-semibold">
                                {item?.name}
                            </h3>
                            <button title="Remove Item"
                                className="m-0.5 py-1 px-3 bg-[#c26100] rounded-xl cursor-pointer font-semibold text-white hover:bg-[#e73336]"
                            >
                                ×
                            </button>
                        </div>
                        <div className="w-full flex justify-start items-center">
                            <button title="Decrease Quantity"
                                className="my-0.5 mx-2 py-0.5 px-2 bg-[#c26100] rounded-xl cursor-pointer font-semibold text-white hover:bg-[#e73336]"
                            >
                                -
                            </button>
                            <span>{cartItems.length}</span>
                            <button title="Decrease Quantity"
                                className="my-0.5 mx-2 py-0.5 px-2 bg-[#c26100] rounded-xl cursor-pointer font-semibold text-white hover:bg-[#e73336]"
                            >
                                +
                            </button>
                        </div>

                    </li>
                ))}  
            </ul>

            <button onClick={handleClearCart}
                className="p-2 m-2 bg-black rounded-xl text-white cursor-pointer"
            >
                    Clear Cart
            </button>
        </div>
    );
};

export default Cart2;