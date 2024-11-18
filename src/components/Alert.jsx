import React, { useEffect, useState } from "react";
import useAlert from "../hooks/useAlert";
import { Icon } from "@iconify/react/dist/iconify.js";

const Alert = () => {
  const { alert, clearAlert } = useAlert();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (alert.message) {
      setIsVisible(true);
      let timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (!alert.message) return null;

  return (
    <div className={`alert-container ${isVisible && "show"}`}>
      <div className={`alert ${alert.type}`}>
        <span>{alert.message}</span>
        <button className="closeButton" onClick={clearAlert}>
          <Icon icon="mdi:close" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
