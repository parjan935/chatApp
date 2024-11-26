import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Chatting from "./components/Chatting";


const App = () => {
  const socket=null;
  return (
    <Routes>
      <Route path="/" element={<Dashboard socket={socket}/>}/>
      <Route path="/login" element={<Login socket={socket}/>} />
      <Route path="/signup" element={<SignUp socket={socket}/>} />
      <Route path="/chat" element={<Chatting socket={socket}/>} />
    </Routes>
  );
};

export default App;
