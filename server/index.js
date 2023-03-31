// imports
import express from "express";
const app = express()
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import * as dotenv from 'dotenv'
import main from "./mongoConnect.js";
import routes from "./routes/authRoutes.js"
import msgRoute from "./routes/conversationRoute.js"
// import { createServer } from "http";
import { Server } from "socket.io";
// const httpServer = createServer();

main().then(() => {
    console.log("db connected succesfully")
})

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
dotenv.config()

app.use("/api/auth", routes)
app.use("/api/store", msgRoute)

const server = app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))

const io = new Server(server, {
    cors: {
        origin : "http://localhost:3000",
        credentials: true
    }
});

global.onlineUsers = new Map()

io.on("connection", (socket) => {
   global.chatSocket = socket

   socket.on("addUser", (userId)=>{
    onlineUsers.set(userId,socket.id)
   })

   socket.on("typing", (txt)=>{
       const sendUserSocket = onlineUsers.get(txt.userId);
    socket.to(sendUserSocket).emit("state-receive",{...txt})
   })

   socket.on("sendMsg",(data)=>{
       const sendUserSocket = onlineUsers.get(data.receiver);
       if(sendUserSocket){
           socket.to(sendUserSocket).emit("msg-receive",{msg:data.message, user:data.sender})
        }
    })
});
    
// httpServer.listen(process.env.PORT);