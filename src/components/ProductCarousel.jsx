import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const ProductCarousel = ({ category }) => {
  const [movies, setMovies] = useState([]);
  const [mouseState, setMouseState] = useState({ isMoving: false });

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 768 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 768, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, [category]);

  return (
    <section className="carousel">
      <h2>{category.replace("_", " ").toUpperCase()}</h2>
      <Carousel
        beforeChange={() => setMouseState({ isMoving: true })}
        afterChange={() => setMouseState({ isMoving: false })}
        responsive={responsive}
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        minimumTouchDrag={50}
        focusOnSelect={false}
        infinite
        itemClass=""
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={5}
        swipeable
      >
        {movies.map((movie) => (
          <div key={movie.id}>
            {/* <Link
              to={`/details/${movie.id}`}
              onClick={(e) => {
                if (mouseState.isMoving) {
                  e.preventDefault();
                }
              }}
            > */}
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>

            {/* </Link> */}
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default ProductCarousel;
