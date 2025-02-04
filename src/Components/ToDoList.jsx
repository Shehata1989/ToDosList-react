/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import DialogComponent from "./DialogComponent";

import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import { useState, useEffect, useMemo } from "react";
import { useTodoContext } from "../TodoContext/TodoContext";
import ToDo from "./ToDo";
import { useSnackBarContext } from "../TodoContext/SnackBarContext";

const ToDoList = () => {
  const { tasks, addTask, removeTask, updateTask } = useTodoContext();
  const { handleClick } = useSnackBarContext();
  const [task, setTask] = useState({});
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newDetails, setNewDetails] = useState("");

  // Filter Todos
  const filteredTasks = useMemo(() => {

    return tasks.filter((task) => {
      if (filter === "completed") return task.isCompleted;
      if (filter === "not-completed") return !task.isCompleted;
      return true;
    });
  }, [tasks, filter]);

  const handelRemoveDialogOpen = (task) => {
    setTask(task);
    setOpenRemoveDialog((prev) => !prev);
  };

  const handelRemoveDialogClose = () => {
    setOpenRemoveDialog((prev) => !prev);
  };

  const handelEditDialogOpen = (task) => {
    setTask(task);
    setNewTaskName(task?.taskName || "");
    setNewDetails(task?.details || "");
    setOpenEditDialog(true);
  };

  const handelEditDialogClose = () => {
    setOpenEditDialog((prev) => !prev);
  };

  const handelAddTask = () => {
    if (title.trim() !== "") {
      addTask(title);
      handleClick("Task added successfully");
      setTitle("");
    }
  };

  const handleEditUpdate = () => {
    if (
      task &&
      (newTaskName.trim() !== task.taskName ||
        newDetails.trim() !== task.details)
    ) {
      updateTask(task.id, newTaskName.trim(), newDetails.trim());
      setOpenEditDialog(false);
      handleClick("Task updated successfully");
    }
  };

  const handleRemoveConfirm = () => {
    removeTask(task.id);
    setOpenRemoveDialog(false);
    handleClick("Task removed successfully");
  };

  const handleEnterKey = useCallback(
    (e) => {
      if (e.key === "Enter") {
        if (openEditDialog) {
          handleEditUpdate();
        } else if (openRemoveDialog) {
          handleRemoveConfirm();
        } else if (title.trim() !== "") {
          addTask(title.trim());
          handleClick("Task added successfully");
          setTitle("");
        }
      }
    },
    [
      title,
      openEditDialog,
      openRemoveDialog,
      handleEditUpdate,
      handleRemoveConfirm,
      addTask,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEnterKey);
    return () => document.removeEventListener("keydown", handleEnterKey);
  }, [handleEnterKey]); // فقط دالة `handleEnterKey`

  const todosJsx = filteredTasks.map((task) => (
    <ToDo
      key={task.id}
      task={task}
      showDialog={{ handelRemoveDialogOpen, handelEditDialogOpen }}
    />
  ));

  return (
    <>
      {/* حوار الحذف */}
      <DialogComponent
        open={openRemoveDialog}
        handleClose={handelRemoveDialogClose}
        title="Are you sure you want to remove this task?"
        content="The task will be permanently deleted."
        onConfirm={handleRemoveConfirm}
      />

      {/* حوار التعديل */}
      <DialogComponent
        open={openEditDialog}
        handleClose={handelEditDialogClose}
        title="Edit Task"
        content={
          <>
            <TextField
              fullWidth
              margin="dense"
              value={newTaskName}
              label="New Task Name"
              variant="outlined"
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="dense"
              value={newDetails}
              label="Details"
              variant="outlined"
              onChange={(e) => setNewDetails(e.target.value)}
            />
          </>
        }
        onConfirm={handleEditUpdate}
      />

      <Container maxWidth="sm">
        <Card
          sx={{
            minWidth: 275,
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": { width: "10px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#163f3d !important",
              borderRadius: "20px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#163f3d !important",
            },
          }}
          style={{ height: "70vh", overflowY: "auto" }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              color="primary"
              style={{ fontWeight: "900" }}
            >
              To Do List
            </Typography>

            <Divider />

            {/* فلترة المهام */}
            <ToggleButtonGroup
              value={filter}
              onChange={(e, newValue) => {
                if (newValue) setFilter(newValue);
              }}
              exclusive
              color="primary"
              className="mt-4"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="completed">Completed</ToggleButton>
              <ToggleButton value="not-completed">Not Completed</ToggleButton>
            </ToggleButtonGroup>

            {/* إدخال مهمة جديدة */}
            <Grid
              container
              justifyContent={"space-between"}
              spacing={2}
              className="mt-7"
            >
              <Grid size={8}>
                <TextField
                  value={title}
                  label="Add Task"
                  variant="outlined"
                  className="!w-full !h-full"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  onClick={handelAddTask}
                  className="!w-full h-full"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            {/* قائمة المهام */}

            {todosJsx}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default React.memo(ToDoList);
