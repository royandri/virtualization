import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Notflix from "./components/Notflix";
import BigList from "./components/BigList";

import "./App.css";

const App = () =>  {
  return (
    <BrowserRouter> 
      <Routes>
        <Route exact path="/" element={<BigList />} />
        <Route exact path="/notflix" element={<Notflix />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
