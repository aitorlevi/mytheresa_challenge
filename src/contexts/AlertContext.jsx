import React, { createContext, useState } from "react";

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ type: "", message: "" });

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const clearAlert = () => {
    setAlert({ type: "", message: "" });
  };
  return (
    <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
export { AlertContext };
