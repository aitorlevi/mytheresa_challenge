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
      breakpoint: { min: 768, max: 5000 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 768, min: 600 },
      items: 3,
      slidesToSlide: 3,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 2,
      slidesToSlide: 2,
      partialVisibilityGutter: 20,
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
        infinite
        containerClass="carousel-wrapper"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        partialVisible={true}
      >
        {movies.map((movie) => (
          <div className="movie" key={movie.id}>
            <Link
              className="movie-link"
              to={`/details/${category}/${movie.id}`}
              onClick={(e) => {
                // No able to click when carousel is dragging or swiping
                if (mouseState.isMoving) {
                  e.preventDefault();
                }
              }}
              draggable="false"
            >
              <img
                draggable="false"
                src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                alt={movie.title}
              />
              <h4>{movie.title}</h4>
            </Link>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default ProductCarousel;
