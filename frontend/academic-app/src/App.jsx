import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import { LoginForm } from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffa500",
    },
    secondary: {
      main: "#EEEEEF",
    },
  },
});

export default function App() {
  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      document.querySelector(".toolBar").classList.add("nav-color");
    } else {
      document.querySelector(".toolBar").classList.remove("nav-color");
    }
  }

  window.onscroll = () => {
    scrollFunction();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/signup" element={<Register />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}
