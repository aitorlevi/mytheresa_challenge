import React from "react";
import Carousel from "../components/ProductCarousel";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <section>
      <Header />
      <Carousel category="popular" />
      <Carousel category="top_rated" />
      <Carousel category="upcoming" />
    </section>
  );
};

export default HomePage;
