import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailPage from "./pages/DetailPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/details/:id" element={<DetailPage />} />
    </Routes>
  );
};

export default App;
