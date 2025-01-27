import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
//import { UserProvider } from "./providers/UserContext.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <React.StrictMode>
      <BrowserRouter>

        <App />

      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>
)