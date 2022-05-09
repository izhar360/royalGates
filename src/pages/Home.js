import React, { useState, useEffect } from "react";
import Slider from "../components/Slider";
import CgDiv from "../components/CgDiv";
import ProductsC from "../components/ProductsC";
import { Helmet } from "react-helmet";
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Royal Cars Inc.</title>
      </Helmet>
      <div>
        <Slider />

        <CgDiv />
        <ProductsC />
      </div>
    </>
  );
};

export default Home;
