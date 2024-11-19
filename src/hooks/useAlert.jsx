import { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";

/**
 * Custom hook for accessing alert context functionality
 *
 * @function
 * @description Provides simplified access to alert context methods and state
 * @returns {Object} Object containing alert state and methods
 * @example
 * const { showAlert, clearAlert, alert } = useAlert();
 */
const useAlert = () => useContext(AlertContext);

export default useAlert;
