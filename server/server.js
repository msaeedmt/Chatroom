const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const {isRealString}=require('./utils/validation');

let app = express();
let server = http.createServer(app);
let io = socketIo(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("new user connected")

    socket.emit('newMessage', generateMessage('admin', 'welcome to the chatroom'));

    socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'));

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback("either the username or roomname is invalid!");
        }

        callback();
    });

    socket.on('disconnect', () => {
        console.log('user was disconnected!');
    });

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.name, message.text)),
            callback('server got it');

    });
});

server.listen(3000, () => {
    console.log("Connected to the server ...");
});

