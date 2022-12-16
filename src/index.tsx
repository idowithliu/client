import * as React from "react";
// @ts-ignore
import { createRoot } from "react-dom/client";
import { App } from "./components/app";

const root = createRoot(document.getElementById("root"));
root.render(<App />);