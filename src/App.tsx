import React from 'react';
import './App.css';
import Login from "./components/auth/Login";
import {Route, Routes} from "react-router-dom";
import AuthRedirection from "./components/auth/AuthRedirection";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home/*" element={<AuthRedirection />} />
      <Route path="*" element={<>Invalid URL</>} />
    </Routes>
  )
}

export default App;
