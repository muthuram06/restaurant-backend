import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App";

import {
  GoogleOAuthProvider
} from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <GoogleOAuthProvider
    clientId="115880774642-1c4rlttil4s78jklf66nuqdk9ns2ula3.apps.googleusercontent.com"
  >
    <App />
  </GoogleOAuthProvider>
);