import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Pages/AuthContextYoussef/AuthContextYoussef";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import Home from "./Pages/Home/Home";
import Layout from "./Pages/Layout/Layout";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Shop from "./Pages/Shop/Shop";
import Sitemap from "./Components/Sitemap/Sitemap";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
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
import AboutUs from "./Pages/AboutUs/AboutUs";
import Customersupport from "./Pages/Customersupport/Customersupport";

export default function App() {
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
        { path: "/sitemap", element: <Sitemap /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/login", element: <Login /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/card", element: <ProductCard /> },
        { path: "*", element: <ErrorPage /> },
        { path: "/cart", element: <Cart /> }, // Cart doesn't need protection since anyone can view it
        { path: "/aboutus", element: <AboutUs /> },
        { path: "/customersupport", element: <Customersupport /> },
        {
          element: <ProtectedRoute />,
          children: [
            { path: "/checkout", element: <Checkout /> },
            { path: "/thankyou", element: <ThankYou /> },
            { path: "/account", element: <Account /> },
          ],
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}
