import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "../Carousel/Carousel";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home">
      <Carousel />
      <p className="home__category">TOP CATEGORIES</p>
      <div className="home__categories">
        <Link to="/products/filter/men">
          <img
            className="categories__image"
            src="https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/9ff1f34e-9242-47fd-9566-e7d7a5c240511594222908483-T-shirt.jpg"
            alt="tshirts"
          />
        </Link>
        <Link to="/products/filter/women">
          <img
            className="categories__image"
            src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2021/9/7/a5539728-5a85-4463-8842-528d1f12d9b11631029248015-Dresses.jpg"
            alt="shorts"
          />
        </Link>
        <Link to="/products/filter/men">
          <img
            className="categories__image"
            src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2021/8/30/91b73e7a-128c-46a6-8049-939c55567bfc1630328574384-suits_blazers.jpg"
            alt="suits"
          />
        </Link>
      </div>
    </div>
  );
};
