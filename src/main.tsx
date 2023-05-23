import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SignIn from "./component/login/signup.controller";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./component/NotFound/NotFound";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
