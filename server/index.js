const express = require("express");
const app = express();
const http = require("http");

const cors = require("cors"); //cors library

const {Server} = require("socket.io"); //importing this class from socket.io library
 
app.use(cors()); //cors middleware that solves loads of issues met with socket.io, that's why we use cors
const server = http.createServer(app); // I am passing the express app that will generate the server

const io = new Server(server, {
    cors: {
        origin: "*", 
    }
});
const PORT =  process.env.PORT || 3001

server.listen(3001, ()=>{
    console.log("Server running")
});

//events
io.on("connection", (socket)=>{
    //event that determins when someone joins a room
    socket.on("join_room", (data)=>{ //data in this case is what we pass to the frontend
       socket.join(data) //socke.join() is a socket.io function
       console.log(`User with ID: ${socket.id} joined room: ${data}`)
    });

    //event that will send the message
    socket.on("send_message", (data)=>{
        console.log("inviato")
        socket.to(data.room).emit("receive_message",data);
    })
    socket.on("disconnect", ()=>{
      console.log("User disconnected", socket.id)
    })
});


