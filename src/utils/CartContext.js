import React, { createContext, useState} from "react";

export const CartContext = createContext();

export const CartProvider = ({ children}) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);

            if(existingItem) {
                return prevItems.map(cartItem =>
                    cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
                );
            }else{
                return [...prevItems, {...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId))
    };

    const increaseQuantity = (itemId) => {
        setCartItems(prevItems => prevItems.map(item =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (itemId) => {
        setCartItems(prevItems => prevItems.map(item =>
            item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        ));
    };

    return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, decreaseQuantity, increaseQuantity}}>
            {children}
        </CartContext.Provider>
    );
};