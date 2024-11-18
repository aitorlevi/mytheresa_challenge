import { createContext, useCallback, useState } from "react";
import PropTypes from "prop-types";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
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
