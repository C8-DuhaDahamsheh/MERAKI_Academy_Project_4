import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="482068401315-rsfdo7p81a8fkj3r0abo35o49n7qttfu.apps.googleusercontent.com">
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
  </GoogleOAuthProvider>
);
