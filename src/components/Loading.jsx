import React, { useEffect, useState } from "react";
import useLoading from "../hooks/useLoading";

const Loading = () => {
  const { isLoading } = useLoading();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 200);
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
