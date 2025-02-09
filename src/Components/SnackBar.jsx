/* eslint-disable no-undef */
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import { useSnackBarContext } from "../TodoContext/SnackBarContext";

function SnackBar() {

  const {openToast, handleClose} = useSnackBarContext();
  return (
    <>
      <Snackbar
        open={openToast.open}
        onClose={handleClose}
        TransitionComponent={openToast.Transition}
        message="I love snacks"
        key={openToast.Transition.name}
        autoHideDuration={1200}
      >
        
        <Alert className="bg-green-200" severity="success">{openToast.message}</Alert>
      </Snackbar>
    </>
  );
}

export default SnackBar;
