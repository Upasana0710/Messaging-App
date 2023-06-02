import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from "http";
import { Server } from "socket.io";
import userRoutes from '../server/routes/userRoutes.js';
import messageRoutes from '../server/routes/messageRoutes.js';
import conversationRoutes from '../server/routes/conversationRoutes.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>app.listen(PORT, ()=> {
        console.log(`Chat server is running on port ${PORT}`);
    }))
    .catch((err)=>console.log(err));

const corsConfig={
    credentials: true,
    origin: true,
};

app.use(helmet());
app.use(compression());
app.use(cors(corsConfig));
app.use(morgan('tiny'));
    
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use('/user',userRoutes);
app.use('/message',messageRoutes);
app.use('/conversation',conversationRoutes);

//Socket.io
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "https://chatzbee.netlify.app/",
  },
});

httpServer.listen(8900, () => {
  console.log("Socket.IO server is running on port 8900");
});
let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};


io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});
