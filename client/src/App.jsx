import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Chat from "./pages/chatBox/Chat";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";


function App() {
  const socket = useRef();
  useEffect(() => {
    socket.current = io("http://localhost:5000");
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
