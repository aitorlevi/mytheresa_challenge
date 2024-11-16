import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Icon } from "@iconify/react/dist/iconify.js";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const DetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      const data = await response.json();
      var stars = Math.round(data.vote_average * 0.5 * 2) / 2;
      // 3.5
      for (let i = 0; i < stars; i++) {
        const element = array[i];
      }
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  const setStars = (stars) => {
    var number0dot5 = stars / 0.5;
    const codeStars = [];
    for (let i = 0; i < stars; i++) {
      if (i % 1 === 0) {
        numStars.push(1);
      } else if ()
      
    }
  }

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    localStorage.setItem("wishlist", JSON.stringify([...wishlist, movie]));
    alert(`${movie.title} added to wishlist!`);
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <section className="detail-page">
      <h2>{movie.title}</h2>
      <div className="info">
        <div className="image-vote">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <span className="vote-average back">
            <Icon icon="mdi-light:star" />
            <Icon icon="mdi-light:star" />
            <Icon icon="mdi-light:star" />
            <Icon icon="mdi-light:star" />
            <Icon icon="mdi-light:star" />
          </span>
        </div>

        <div className="copy-cta">
          <p>{movie.overview}</p>
          <button className="cta" onClick={addToWishlist}>
            Add to Wishlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default DetailPage;
