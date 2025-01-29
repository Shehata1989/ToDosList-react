/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardContent,
  DialogContentText,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useTodoContext } from "../TodoContext/TodoContext";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";

const ToDo = ({ task }) => {
  const { removeTask, isCompleted, updateTask } = useTodoContext();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.taskName);
  const [newDetails, setNewDetails] = useState(task.details);

  const handleEditUpdate = () => {
    updateTask(task.id, newTaskName, newDetails);
    setOpenEditDialog(false);
  };

  const handleEditCancel = () => {
    setOpenEditDialog(false);
    setNewTaskName(task.taskName);
  };

  const handleRemoveCancel = () => {
    setOpenRemoveDialog(false);
  };

  const handleRemoveConfirm = () => {
    removeTask(task.id);
    setOpenRemoveDialog(false);
  };

  useEffect(() => {
    const handleEnterKey = (e) => {
      if (
        (e.key === "Enter" && newTaskName.trim() !== "") ||
        (e.key === "Enter" && newDetails.trim() !== "")
      ) {
        updateTask(task.id, newTaskName, newDetails);
        setOpenEditDialog(false);
      }
    };

    document.addEventListener("keydown", handleEnterKey);

    return () => document.removeEventListener("keydown", handleEnterKey);
  }, [newTaskName, newDetails]);

  return (
    <>
      {/* Remove Dialog */}
      <Dialog
        open={openRemoveDialog}
        onClose={handleRemoveCancel}
        disableRestoreFocus
      >
        <DialogTitle>
          {"Are you sure you want to remove this task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveCancel}>Disagree</Button>
          <Button onClick={handleRemoveConfirm}>Agree</Button>
        </DialogActions>
      </Dialog>
      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditCancel}
        disableRestoreFocus
      >
        <DialogTitle>{"Are you sure you want to edit this task?"}</DialogTitle>
        <DialogContent>
          <TextField
            style={{ marginTop: "20px", width: "100%" }}
            value={newTaskName}
            label="New Task Name"
            variant="outlined"
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <TextField
            style={{ marginTop: "20px", width: "100%" }}
            value={newDetails}
            label="Details"
            variant="outlined"
            onChange={(e) => setNewDetails(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel}>Disagree</Button>
          <Button onClick={handleEditUpdate}>Agree</Button>
        </DialogActions>
      </Dialog>

      <Card sx={{ minWidth: 275 }} className="card-todo mt-7">
        <CardContent className="p-5">
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={2}
          >
            <Grid size={8} sx={{ textAlign: "left" }}>
              {/* Task Name */}
              <Typography
                gutterBottom
                sx={{ fontSize: 24, fontWeight: "bold" }}
              >
                {task.taskName}
              </Typography>
              {/* Task Details */}
              <Typography
                gutterBottom
                sx={{ fontSize: 14, color: "#cdc5c5", margin: "0px" }}
              >
                {task.details}
              </Typography>
            </Grid>
            <Grid size={4}>
              <Stack direction="row" alignItems="center" spacing={1}>
                {/* Task Icons */}
                <IconButton
                  className={`transition-all duration-300 ${
                    task.isCompleted
                      ? "bg-green-500 text-white hover:bg-white hover:text-green-500"
                      : "bg-white text-green-500 hover:bg-green-500 hover:text-white"
                  }`}
                  style={{ border: "2px solid" }}
                  onClick={() => isCompleted(task.id)}
                >
                  <CheckOutlinedIcon />
                </IconButton>

                <IconButton
                  className="!text-blue-500 bg-white hover:bg-slate-300"
                  style={{ border: "2px solid" }}
                  onClick={() => setOpenEditDialog(true)} // Open Edit Dialog
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  className="!text-red-500 bg-white hover:bg-slate-300"
                  style={{ border: "2px solid" }}
                  onClick={() => setOpenRemoveDialog(true)} // Open Remove Dialog
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default ToDo;
