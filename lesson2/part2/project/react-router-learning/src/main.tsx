import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import MemoryRouterDemo from "./pages/MemoryRouterDemo.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <hr />
    <MemoryRouterDemo />
  </StrictMode>,
);
