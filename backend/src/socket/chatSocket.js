import Chat from "../models/Chat.js";

const users = {};

const socket = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("login", (userId) => {
      socket.userId = userId;
      users[userId] = socket.id;
      console.log(`User ${userId} logged in`);
    });

    socket.on("private message", async ({ to, message }) => {
      const recipientSocket = users[to];
      if (recipientSocket) {
        io.to(recipientSocket).emit("private message", {
          from: socket.userId,
          message,
        });
        // Store the chat message in the database
        const chat = new Chat({ from: socket.userId, to, message });
        await chat.save();
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      Object.keys(users).forEach((userId) => {
        if (users[userId] === socket.id) {
          delete users[userId];
        }
      });
    });
  });
};

export default socket;
