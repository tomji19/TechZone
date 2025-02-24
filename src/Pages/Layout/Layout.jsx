import React from "react";
import classes from "../Layout/Layout.module.css";
import { Outlet } from "react-router-dom";
import FirstHeader from "../../Components/FirstHeader/FirstHeader";
import SecondHeader from "./../../Components/SecondHeader/SecondHeader";
import Footer from "../../Components/Footer/Footer";

export default function Layout() {
  return (
    <>
      <FirstHeader />
      <SecondHeader />
      <Outlet />
      <Footer />
    </>
  );
}
