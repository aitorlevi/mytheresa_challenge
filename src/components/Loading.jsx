import React from "react";
import useLoading from "../hooks/useLoading";

const Loading = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
