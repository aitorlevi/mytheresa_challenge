import React from "react";
import Carousel from "../components/ProductCarousel";

const POPULAR = import.meta.env.VITE_CATEGORY_POPULAR;
const TOP_RATED = import.meta.env.VITE_CATEGORY_TOP_RATED;
const UPCOMING = import.meta.env.VITE_CATEGORY_UPCOMING;

const HomePage = () => {
  return (
    <>
      <Carousel category={POPULAR} />
      <Carousel category={TOP_RATED} />
      <Carousel category={UPCOMING} />
    </>
  );
};

export default HomePage;
