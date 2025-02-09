/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useState } from "react";
import Slide from "@mui/material/Slide";
import Fade from "@mui/material/Fade";

export const SnackBarContext = createContext(null);

export const SnackBarProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars

  const initialToast = { open: false, message: "", Transition: Fade };
  const [openToast, setOpenToast] = useState(initialToast);

  // Animation for SnackBar
  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  const openSnackBar = (message, Transition = SlideTransition) => {
    setOpenToast((prev) => ({
      ...prev,
      open: true,
      message: message,
      Transition,
    }));
  };

  const handleClose = () => {
    setOpenToast((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <SnackBarContext.Provider value={{ openToast,openSnackBar, handleClose }}>
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnackBarContext = () => useContext(SnackBarContext);
