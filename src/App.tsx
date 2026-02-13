import { ThemeProvider } from "./app/context/ThemeContext";
import { AppRouter } from "./router";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
