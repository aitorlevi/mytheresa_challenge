import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import WishlistPage from "./pages/WishlistPage";
import Header from "./components/Header";
import Alert from "./components/Alert";
import Loading from "./components/Loading";

const App = () => {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id/:category?" element={<DetailPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
      <Alert />
      <Loading />
    </BrowserRouter>
  );
};

export default App;
