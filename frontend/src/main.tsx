import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <MantineProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MantineProvider>
  </GoogleOAuthProvider>
);
