import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"
import "./index.css";
import { Navbar } from "../components/Navbar.tsx";
import { Footer } from "../components/Footer.tsx";
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
        <Navbar />
        <App />
        <Footer />
    </StrictMode>
  </BrowserRouter>
);
