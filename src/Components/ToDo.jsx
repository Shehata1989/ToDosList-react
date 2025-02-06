/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useSnackBarContext } from "../TodoContext/SnackBarContext";
import { useTodosContext } from "../TodoContext/TodosContext";
import React from "react";
const ToDo = ({ task, showDialog }) => {
  console.log("render todo");
  const { handleClick } = useSnackBarContext();
  const { handelRemoveDialogOpen, handelEditDialogOpen } = showDialog;
  const { dispatch} = useTodosContext();


  const handelIsCompleted = () => {
    dispatch({ type: "COMPLETE_TASK", payload: task.id });
    if (!task.isCompleted) {
      handleClick("Task completed successfully");
    } else {
      handleClick("Task uncompleted successfully");
    }
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }} className="card-todo mt-7">
        <CardContent className="p-5">
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={3}
          >
            <Grid xs={12} sm={8} sx={{ sm: { textAlign: "right" } }}>
              <Typography
                className="break-words"
                gutterBottom
                sx={{ fontSize: 24, fontWeight: "bold" }}
              >
                {task.taskName}
              </Typography>
              <Typography
                gutterBottom
                sx={{ fontSize: 14, color: "#cdc5c5", margin: "0px" }}
              >
                {task.details}
              </Typography>
            </Grid>
            <Grid xs={12} sm={4}>
              <Stack direction="row" spacing={1}>
                {/* زر التحقق */}
                <IconButton
                  className={`transition-all duration-300 ${
                    task.isCompleted
                      ? "!text-white bg-green-500 hover:bg-green-600"
                      : "!text-green-500 bg-white hover:bg-slate-300"
                  }`}
                  style={{ border: "2px solid" }}
                  onClick={handelIsCompleted}
                >
                  <CheckOutlinedIcon />
                </IconButton>
                {/* زر التعديل */}
                <IconButton
                  className="!text-blue-500 bg-white hover:bg-slate-300"
                  style={{ border: "2px solid" }}
                  onClick={() => handelEditDialogOpen(task)}
                >
                  <EditOutlinedIcon />
                </IconButton>
                {/* زر الحذف */}
                <IconButton
                  className="!text-red-500 bg-white hover:bg-slate-300"
                  style={{ border: "2px solid" }}
                  onClick={() => handelRemoveDialogOpen(task)}
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

export default React.memo(ToDo);
