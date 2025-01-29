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

import Grid from '@mui/material/Grid2';
import Container from "@mui/material/Container";
import { useState } from "react";
import ToDo from "./ToDo";
import { useTodoContext } from "../TodoContext/TodoContext";
import { useEffect } from "react";
import { useCallback } from "react";

const ToDoList = () => {
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const { tasks,setTasks, addTask } = useTodoContext();

  
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "not-completed") return !task.isCompleted;
    return true;
  });
  
  const todosJsx = filteredTasks.map((task) => <ToDo key={task.id} task={task} />);

  const handleEnterKey = useCallback(
    (e) => {
      if (e.key === "Enter" && title.trim() !== "") {
        addTask(title);
        setTitle("");
      }
    },
    [title]
  );


  useEffect(() => {
    document.addEventListener("keydown", handleEnterKey);
    return () => document.removeEventListener("keydown", handleEnterKey);
  }, [handleEnterKey]);


  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
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
          color="primary" className="mt-4">
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
            <ToggleButton value="not-completed">Not Completed</ToggleButton>
          </ToggleButtonGroup>

          {/* قائمة المهام */}

          {todosJsx}

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
                onClick={() => {
                  if (title.trim() !== "") {
                    addTask(title);
                    setTitle("");
                  }
                }}
                className="!w-full h-full"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ToDoList;
