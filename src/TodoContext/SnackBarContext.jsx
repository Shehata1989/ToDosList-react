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
  const [openToast, setOpenToast] = useState({
    open: false,
    message: "",
    Transition: Fade,
  });

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleClick = (message, Transition = SlideTransition) => {
    setOpenToast({
      open: true,
      message: message,
      Transition,
    });
  };


  const handleClose = () => {
    setOpenToast({
      ...openToast,
      open: false,
    });
  };

  return (
    <SnackBarContext.Provider
      value={{ openToast, handleClick, handleClose }}
    >
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnackBarContext = () => useContext(SnackBarContext);