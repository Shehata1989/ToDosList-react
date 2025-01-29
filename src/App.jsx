import { CssBaseline } from "@mui/material";
import "./App.css";
import ToDoList from "./Components/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodoContextProvider } from "./TodoContext/TodoContext";

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
    text: {
      primary: "#212121", // لون النص الأساسي (Dark Mode - أسود)
      secondary: "#757575", // لون النص الثانوي (رمادي)
      disabled: "#bdbdbd", // لون النص عند التعطيل
    },
    background: {
      default: "#f5f5f5", // لون الخلفية الافتراضي
      paper: "#ffffff", // لون خلفية العناصر (مثل البطاقات)
    },
    divider: "#e0e0e0", // لون الحدود الفاصلة
    action: {
      active: "#163f3d", // لون النص أو الرموز النشطة
      hover: "rgba(22, 63, 61, 0.20)", // لون الخلفية عند التمرير
      selected: "rgba(22, 63, 61, 0.16)", // لون العنصر عند تحديده
      disabled: "rgba(0, 0, 0, 0.26)", // لون العنصر عند تعطيله
      disabledBackground: "rgba(0, 0, 0, 0.12)", // خلفية العنصر المعطل
      focus: "rgba(22, 63, 61, 0.12)", // تأثير عند التركيز
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodoContextProvider>
        <CssBaseline />
        <div className="flex items-center justify-center min-h-screen text-center App">
          <ToDoList />
        </div>
      </TodoContextProvider>
    </ThemeProvider>
  );
}

export default App;
