let socket = io();
console.log("omad to js");

socket.on('connect', function () {
    console.log("connected to the server");
});

socket.on('disconnect', function () {
    console.log("server was disconnected");
});

socket.on('newMessage', function (message) {
    console.log(message);
});

socket.emit('createMessage',{
    from:"saeed",
    text:"I'm here"
},function (message) {
    console.log(message);
});