import Carousel from "../components/Carousel";

const POPULAR = import.meta.env.VITE_CATEGORY_POPULAR;
const TOP_RATED = import.meta.env.VITE_CATEGORY_TOP_RATED;
const UPCOMING = import.meta.env.VITE_CATEGORY_UPCOMING;

/**
 * HomePage component displaying movie carousels
 *
 * @component
 * @description Renders carousels for popular, top-rated, and upcoming movies
 * @returns {JSX.Element} Carousels for different movie categories
 */
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
