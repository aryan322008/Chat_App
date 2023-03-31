import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Chat from "./pages/chat";
import Login from "./pages/login";
import Register from "./pages/register";
import Avatar from "./pages/userAvatar";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setAvatar" element={<Avatar/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
