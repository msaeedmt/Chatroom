let socket = io();
console.log("omad to js");

socket.on('connect', function () {
    console.log("connected to the server");
});

socket.on('disconnect', function () {
    console.log("server was disconnected");
});

socket.on('newMessage', function (message) {
    let li=jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    $('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        name: "user",
        text: $('#message').val()
    },function () {

    });
});