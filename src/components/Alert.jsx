import React from "react";
import useAlert from "../hooks/useAlert";

const Alert = () => {
  const { alert, clearAlert } = useAlert();
  if (!alert.message) return null;

  const typeStyles = {
    error: { backgroundColor: "#f44336" }, // Rojo
    warning: { backgroundColor: "#ffa726" }, // Naranja
    success: { backgroundColor: "#66bb6a" }, // Verde
  };
  return (
    <div style={styles.container}>
      <div style={{ ...styles.alert, ...typeStyles[alert.type] }}>
        <p>{alert.message}</p>
        <button style={styles.closeButton} onClick={clearAlert}>
          X
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
  },
  alert: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "16px",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
  },
  message: {
    margin: 0,
    marginRight: "10px",
  },
  closeButton: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Alert;
