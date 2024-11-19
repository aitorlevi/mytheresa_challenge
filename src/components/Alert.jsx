import { useEffect, useState } from "react";
import useAlert from "../hooks/useAlert";
import { Icon } from "@iconify/react/dist/iconify.js";

/**
 * Alert component for displaying temporary notification messages
 *
 * @component
 * @description Renders an alert with automatic dismissal and close functionality
 * @returns {JSX.Element|null} Rendered alert component or null if no message
 */
const Alert = () => {
  const { alert, clearAlert } = useAlert();
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Manages alert visibility and auto-dismiss behavior
   *
   * @effect
   * @description Shows alert for 3 seconds when a new message is received
   * @dependency [alert] - Triggered on alert changes
   */
  useEffect(() => {
    if (alert.message) {
      setIsVisible(true);
      let timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  // Don't render anything if there's no alert message
  if (!alert.message) return null;

  return (
    // Dynamic classes for visibility and alert type
    <div className={`alert-container ${isVisible && "show"}`}>
      <div className={`alert ${alert.type}`}>
        <span>{alert.message}</span>
        <button className="close-button" onClick={clearAlert}>
          <Icon icon="mdi:close" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
