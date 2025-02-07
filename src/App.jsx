import { CssBaseline } from "@mui/material";
import "./App.css";
import ToDoList from "./Components/ToDoList";
import { ThemeProvider } from "@mui/material/styles";
import { TodosContextProvider } from "./TodoContext/TodosContext";
import SnackBar from "./Components/SnackBar";
import { SnackBarProvider } from "./TodoContext/SnackBarContext";
import { theme } from "./TodoContext/theme";



function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosContextProvider>
        <SnackBarProvider>
          <CssBaseline />
          <div className="flex items-center justify-center min-h-screen text-center App">
            <SnackBar />
            <ToDoList />
          </div>
        </SnackBarProvider>
      </TodosContextProvider>
    </ThemeProvider>
  );
}

export default App;
