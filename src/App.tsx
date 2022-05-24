import React from 'react';
import './App.css';
import Login from "./components/auth/Login";
import {Route, Routes} from "react-router-dom";
import {Counter} from "./components/counter/Counter";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/counter" element={<Counter />}/>
        <Route path="*" element={<>Invalid URL!</>} />
      </Routes>
    </>
  );
}

export default App;
