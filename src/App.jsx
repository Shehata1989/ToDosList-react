import { CssBaseline } from "@mui/material";
import "./App.css";
import ToDoList from "./Components/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContextProvider } from "./TodoContext/TodosContext";
import SnackBar from "./Components/SnackBar";
import { SnackBarProvider } from "./TodoContext/SnackBarContext";

const theme = createTheme({
  typography: {
    fontFamily: '"Alexandra", sans-serif',
    fontWeight: 700,
  },
  palette: {
    primary: {
      main: "#163f3d",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

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
