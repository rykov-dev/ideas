import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./style.css";

let mountPoint = document.getElementById("app");
if (!mountPoint) {
   mountPoint = document.createElement("main");
   mountPoint.id = "app";
   document.body.appendChild(mountPoint);
}
const root = createRoot(mountPoint);

root.render(
   <StrictMode>
      <App />
   </StrictMode>
);