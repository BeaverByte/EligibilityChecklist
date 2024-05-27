import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

import "./demos/ipc";
import Eligibility from "./Eligibility";
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Eligibility />
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
