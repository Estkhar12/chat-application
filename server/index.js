import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { createServer } from "http";
import userRoute from "./src/routes/user.route.js";
import chatRoute from "./src/routes/chat.route.js";
import messageRoute from "./src/routes/message.route.js";
import connectDB from "./src/config/connectDB.js";
import chatSocket from "./src/socket/chatSocket.js"

const app = express();
connectDB();
app.use(cors());
app.options("*", cors());

app.use(express.json());

const server = createServer(app);

const io = new Server(server, {
  serveClient: false,
  cors: {
    origin: "*",
  },
});

chatSocket(io);


app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

server.listen(5000, () => {
  console.log("Server is running on port 5000...");
});
