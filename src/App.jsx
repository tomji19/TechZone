import React, { useState, useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Layout from "./Pages/Layout/Layout";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Shop from "./Pages/Shop/Shop";
import Sitemap from "./Components/Sitemap/Sitemap";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import AuthComponent from "./Components/AuthComponent/AuthComponent";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import ThankYou from "./Pages/ThankYou/ThankYou";
import Login from "./Pages/Login/Login";
import { CartProvider } from "./Components/CartContext/CartContext";
import Account from "./Pages/Account/Account";
import ProductCard from "./Components/ProductCard/ProductCard";
import Laptops from "./Pages/Laptops/Laptops";
import Gaming from "./Pages/Gaming/Gaming";
import Smartphones from "./Pages/Smartphones/Smartphones";
import WearablesAccessories from "./Pages/WearablesAccessories/WearablesAccessories";
import PCComponents from "./Pages/PCComponents/PCComponents";

export default function App() {
  // Wishlist state with local storage persistence
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Function to toggle wishlist items
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/shop", element: <Shop /> },
        { path: "/laptops", element: <Laptops /> },
        { path: "/gamingconsoles", element: <Gaming /> },
        { path: "/smartphones", element: <Smartphones /> },
        { path: "/wearablesaccessories", element: <WearablesAccessories /> },
        { path: "/pccomponents", element: <PCComponents /> },
        { path: "/cart", element: <Cart /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/thankyou", element: <ThankYou /> },
        { path: "/login", element: <Login /> },
        { path: "/sitemap", element: <Sitemap /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/auth", element: <AuthComponent /> },
        { path: "/account", element: <Account /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/card", element: <ProductCard /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
