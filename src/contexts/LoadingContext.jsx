import { createContext, useCallback, useState } from "react";
import PropTypes from "prop-types";

/**
 * Context for managing global loading state
 * @type {React.Context}
 */
const LoadingContext = createContext();

/**
 * Provider component for managing application-wide loading indicators
 *
 * @component
 * @description Provides loading state and methods for showing/hiding loading
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} Context provider with loading functionality
 */
const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Activates loading state
   *
   * @function
   * @description Sets loading indicator to true
   */
  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  /**
   * Deactivates loading state
   *
   * @function
   * @description Sets loading indicator to false
   */
  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LoadingProvider;
export { LoadingContext };
