/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// Material Ui
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
import DialogComponent from "./DialogComponent";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
// React
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useSnackBarContext } from "../TodoContext/SnackBarContext";
import { useTodosContext } from "../TodoContext/TodosContext";
import ToDo from "./ToDo";
import { useRef } from "react";

const ToDoList = () => {
  console.log("render todo list");

  const inputRef = useRef(null);
  const { handleClickSnackBar } = useSnackBarContext();
  const [task, setTask] = useState({});
  const [filter, setFilter] = useState("all");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [updateInput, setUpdateInput] = useState({
    newTaskName: "",
    newDetails: "",
  });

  const { todos, dispatch } = useTodosContext();

  // Filter Todos
  const filteredTasks = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "completed") return todo.isCompleted;
      if (filter === "not-completed") return !todo.isCompleted;
      return true;
    });
  }, [todos, filter]);


  const handelRemoveDialogOpen = useCallback((task) => {
    setTask(task);
    setOpenRemoveDialog((prev) => !prev);
  }, []);

  const handelRemoveDialogClose = () => {
    setOpenRemoveDialog((prev) => !prev);
  };

  const handelEditDialogOpen = useCallback((task) => {
    setTask(task);
    setUpdateInput({ newTaskName: task?.taskName, newDetails: task?.details });
    setOpenEditDialog(true);
  }, []);

  const handelEditDialogClose = () => {
    setOpenEditDialog((prev) => !prev);
  };

  const handelAddTask = () => {
    if (!inputRef.current || !inputRef.current.value.trim()) return;
    dispatch({
      type: "ADD_TASK",
      payload: {
        taskName: inputRef.current.value,
      },
    });
    handleClickSnackBar("Task added successfully");
    inputRef.current.value = "";
  };

  const handleEditUpdate = () => {
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        task: task,
        updateInput: updateInput,
      },
    });
    handleClickSnackBar("Task updated successfully");
    setOpenEditDialog((prev) => !prev);
  };

  const handleRemoveConfirm = () => {
    dispatch({
      type: "REMOVE_TASK",
      payload: task.id,
    });
    setOpenRemoveDialog(false);
    handleClickSnackBar("Task removed successfully");
  };

  const handleEnterKey = useCallback(
    (e) => {
      if (e.key === "Enter") {
        if (openEditDialog) {
          handleEditUpdate();
        } else if (openRemoveDialog) {
          handleRemoveConfirm();
        } else if (inputRef.current?.value.trim()) {
          handelAddTask();
        }
      }
    },
    [
      openEditDialog,
      openRemoveDialog,
      handleEditUpdate,
      handleRemoveConfirm,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEnterKey);
    return () => document.removeEventListener("keydown", handleEnterKey);
  }, [handleEnterKey]); // فقط دالة `handleEnterKey`

  const todosJsx = useMemo(
    () =>
      filteredTasks.map((task) => (
        <ToDo
          key={task.id}
          task={task}
          showDialog={{ handelRemoveDialogOpen, handelEditDialogOpen }}
        />
      )),
    [filteredTasks]
  );

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
              value={updateInput.newTaskName}
              label="New Task Name"
              variant="outlined"
              onChange={(e) =>
                setUpdateInput({ ...updateInput, newTaskName: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="dense"
              value={updateInput.newDetails}
              label="Details"
              variant="outlined"
              onChange={(e) =>
                setUpdateInput({ ...updateInput, newDetails: e.target.value })
              }
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
                    inputRef={inputRef}
                  label="Add Task"
                  variant="outlined"
                  className="!w-full !h-full"
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

export default memo(ToDoList, (prevProps, nextProps) => {
  return prevProps.tasks === nextProps.tasks;
});
