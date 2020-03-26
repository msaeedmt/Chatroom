const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
let app = express();
let server = http.createServer(app);
let io = socketIo(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("new user connected")


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback("either the username or roomname is invalid!");
        }

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        socket.join(params.room);
        socket.emit('newMessage', generateMessage('admin', 'welcome to the chatroom'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined the chat`));
        io.to(params.room).emit('updateUsersList',users.getUsersList(params.room));

        callback();
    });

    socket.on('disconnect', () => {
        let user=users.removeUser(socket.id);

        io.to(user.room).emit('updateUsersList',users.getUsersList(user.room));
        io.to(user.room).emit('newMessage',generateMessage('admin',`${user.name} has left the chat!`));
    });

    socket.on('createMessage', (message, callback) => {
        let user=users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)),
                callback('server got it');
        }
    });
});

server.listen(3000, () => {
    console.log("Connected to the server ...");
});

