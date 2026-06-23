import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Exercise from "../latihan/Exercise.jsx";
import Parent from "./latihan/Parent.jsx";
import { CounterContextProvider } from "./context/counterContext.jsx";
import { ThemeContextProvider } from "./context/themeContext.jsx";
 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App/>
    </ThemeContextProvider>
  </React.StrictMode>,
);