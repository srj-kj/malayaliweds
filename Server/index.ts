import http from "http";
import { Server } from "socket.io";
import express from "express";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import messageRoutes from "./routes/messageRoutes";
import conversationRoutes from "./routes/conversationRoutes";

import mongoose from "mongoose";
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();
app.use(cors());

const Port = 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let users: any = [];

const addUser = (userId: any, socketId: any) => {
  !users.some((user: any) => user?.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId: any) => {
  users = users.filter((user: any) => user.socketId !== socketId);
};

const getUser = (userId: any) => {
  return users.find((user: any) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("user disconneted");
    removeUser(socket.id);
  });

  socket.on("adduser", (userid) => {
    addUser(userid, socket.id);
    // io.emit("getuser", users);
    console.log(users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if(user){
      io.to(user?.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
    
  });

  
  socket.on("match", (user) => {
    
    
    const receiver = getUser(user);
    console.log(receiver);
    if (receiver) {
      io.to(receiver?.socketId).emit("matched");
    }
  });
});


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

mongoose
  .connect("mongodb://localhost:27017/malayaliWeds")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(Port, () => {
  console.log(`Listening on port ${Port}`);
});
