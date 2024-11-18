import { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";

const useAlert = () => {
  return useContext(AlertContext);
};

export default useAlert;
