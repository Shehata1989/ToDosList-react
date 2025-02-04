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
import React from "react";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useTodoContext } from "../TodoContext/TodoContext";
import { useSnackBarContext } from "../TodoContext/SnackBarContext";

const ToDo = ({ task, showDialog }) => {
  const { isCompleted } = useTodoContext();
  const { handleClick } = useSnackBarContext();

  const handelIsCompleted = () => {
    isCompleted(task.id);
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
                  onClick={() => handelIsCompleted()}
                >
                  <CheckOutlinedIcon />
                </IconButton>
                {/* زر التعديل */}
                <IconButton
                  className="!text-blue-500 bg-white hover:bg-slate-300"
                  style={{ border: "2px solid" }}
                  onClick={() => showDialog.handelEditDialogOpen(task)}
                >
                  <EditOutlinedIcon />
                </IconButton>
                {/* زر الحذف */}
                <IconButton
                  className="!text-red-500 bg-white hover:bg-slate-300"
                  style={{ border: "2px solid" }}
                  onClick={() => showDialog.handelRemoveDialogOpen(task)}
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
