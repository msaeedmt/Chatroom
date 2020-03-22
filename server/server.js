const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const publicPath = path.join(__dirname, '../public');

let app = express();
let server = http.createServer(app);
let io = socketIo(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("new user connected")

    socket.emit('newMessage',{
        from: "admin",
        text: "welcome the the chatroom"
    });

    socket.broadcast.emit('newMessage',{
        from:"admin",
        text:"new user Joined"
    });

    socket.on('disconnect', () => {
        console.log('user was disconnected!');
    });

    socket.on('createMessage', (message,callback) => {
        io.emit('newMessage', {
            from: message.name,
            text: message.text
        })
        callback("server got it!");
    })
});

server.listen(3000, () => {
    console.log("Connected to the server ...");
})