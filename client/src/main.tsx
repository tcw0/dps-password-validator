import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { CssBaseline } from "@mui/material"
import { SnackbarContextProvider } from "./contexts/SnackbarContext.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarContextProvider>
        <CssBaseline />
        <App />
      </SnackbarContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
