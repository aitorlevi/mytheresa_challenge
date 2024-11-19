import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

/**
 * Custom hook for accessing loading context functionality
 *
 * @function
 * @description Provides simplified access to loading context methods and state
 * @returns {Object} Object containing loading state and methods
 * @example
 * const { isLoading, showLoading, hideLoading } = useLoading();
 */
const useLoading = () => useContext(LoadingContext);

export default useLoading;
