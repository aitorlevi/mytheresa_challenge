import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

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
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    localStorage.setItem("wishlist", JSON.stringify([...wishlist, movie]));
    alert(`${movie.title} added to wishlist!`);
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <section className="detail-page">
      <Header />
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <button onClick={addToWishlist}>Add to Wishlist</button>
    </section>
  );
};

export default DetailPage;
