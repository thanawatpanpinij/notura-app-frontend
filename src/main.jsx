import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CreateModalProvider from "./contexts/CreateModalContext/CreateModalProvider.jsx";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";
import NoteProvider from "./contexts/NoteContext/NoteProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <NoteProvider>
        <CreateModalProvider>
          <App />
        </CreateModalProvider>
      </NoteProvider>
    </AuthProvider>
  </StrictMode>
);
