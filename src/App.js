import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { CartProvider } from "./utils/CartContext.js";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import ContactUS from "./components/Contact.js";
import Error from "./components/Error.js";
import Cart from "./components/Cart.js";
import Cart2 from "./components/Cart2.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import Footer from "./components/Footer.js";
import "../src/style.css";
import appStore from "./utils/appStore.js";
import { Provider } from "react-redux";

const About = lazy(() => import("./components/About.js") );

const AppLayout = () => {
    return (
        <Provider store={appStore}>
            <div className="app">
                <Header />
            
                <Outlet />
            </div>
        </Provider>
    );
};

const HomePage = () => {
    return (
        <>
            <Body />
            <Footer />
        </>
    );
};

const AboutPage = () => {
    return (
        <>
            <About />
            <Footer />
        </>
    );
};

const ContactPage = () => {
    return (
        <>
            <ContactUS />
            <Footer />
        </>
    );
};

const MenuPage = () => {
    return (
        <>
            <RestaurantMenu />
            <Footer />
        </>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/about",
                element: <Suspense fallback={<h1>Loading...</h1>}>
                    <AboutPage />
                </Suspense>
            },
            {
                path: "/contact",
                element: <ContactPage />
            },
            {
                path: "/cart",
                element: <Cart2 />
            },
            {
                path: "/restaurant/:resId",
                element: <MenuPage />
            }
        ],
        errorElement: <Error />,
    },
    
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <CartProvider>
        <RouterProvider router={appRouter} />
    </CartProvider>
);