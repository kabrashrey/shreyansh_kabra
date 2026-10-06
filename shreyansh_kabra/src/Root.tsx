import React from "react";
import App from "./App";
import { ThemeProvider } from "./context/themeProvider";

// Shared by the client entry (main.tsx) and the build-time prerender
// (entry-server.tsx) so both render the exact same tree.
const Root = () => (
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

export default Root;
