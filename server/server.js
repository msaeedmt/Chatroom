const path = require('path');
const express=require('express');
const http=require('http');
const socketIo=require('socket.io');

const publicPath = path.join(__dirname, '../public');

let app = express();
let server=http.createServer(app);
let io =socketIo(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
   console.log("new user connected")

    socket.on('disconnect',()=>{
        console.log('user was disconnected!');
    });
});

server.listen(3000,()=>{
    console.log("Connected to the server ...");
})