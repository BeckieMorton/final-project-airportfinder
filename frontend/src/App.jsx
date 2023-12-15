import { useState } from "react";
import { BrowserRouter, NavLink, Routes } from "react-router-dom";

import routes from "./routes/routes";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Home</NavLink>
          <h1>AirportFinder</h1>
        </nav>
        <main>
          <Routes>{routes}</Routes>
        </main>
      </BrowserRouter>
    </>
  );
};
