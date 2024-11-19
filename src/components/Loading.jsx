import { useEffect, useState } from "react";
import useLoading from "../hooks/useLoading";

const Loading = () => {
  const { isLoading } = useLoading();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
    } else {
      let timeout = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  return (
    isVisible && (
      <div className={`overlay ${isLoading ? "fade-in" : "fade-out"}`}>
        <div className="spinner"></div>
      </div>
    )
  );
};

export default Loading;
