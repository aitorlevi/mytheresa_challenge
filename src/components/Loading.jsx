import { useEffect, useState } from "react";
import useLoading from "../hooks/useLoading";

/**
 * Loading component for global application loading state
 *
 * @component
 * @description Renders a loading overlay with spinner when loading is active
 * @returns {JSX.Element|null} Loading overlay or null
 */
const Loading = () => {
  const { isLoading } = useLoading();
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Manages loading overlay visibility and fade transitions
   *
   * @effect
   * @description Handles showing and hiding of loading overlay with delayed fade-out
   * @dependency [isLoading] - Triggered on loading state changes
   */
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
