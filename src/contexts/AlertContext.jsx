import { createContext, useCallback, useState } from "react";
import PropTypes from "prop-types";

/**
 * Context for managing global alert state
 * @type {React.Context}
 */
const AlertContext = createContext();

/**
 * Provider component for managing application-wide alert notifications
 *
 * @component
 * @description Provides alert state and methods for showing/clearing alerts
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} Context provider with alert functionality
 */
const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ type: "", message: "" });

  /**
   * Shows an alert with specified type and message
   *
   * @function
   * @description Updates alert state with new notification
   * @param {string} type - Type of alert (e.g., 'success', 'error')
   * @param {string} message - Alert message content
   */
  const showAlert = useCallback((type, message) => {
    setAlert({ type, message });
  }, []);

  /**
   * Clears the current alert
   *
   * @function
   * @description Resets alert state to empty
   */
  const clearAlert = useCallback(() => {
    setAlert({ type: "", message: "" });
  }, []);

  return (
    <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AlertProvider;
export { AlertContext };
