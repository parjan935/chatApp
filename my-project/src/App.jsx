import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Chatting from "./components/Chatting";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/chat" element={<Chatting />} />
    </Routes>
  );
};

export default App;
