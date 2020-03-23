let socket = io();
console.log("omad to js");

socket.on('connect', function () {
    console.log("connected to the server");
});

socket.on('disconnect', function () {
    console.log("server was disconnected");
});

socket.on('newMessage', function (message) {
    let template=$('#message-template').html();
    let html=Mustache.render(template,{
        from:message.from,
        text: message.text,
        createdAt: message.createdAt
    });
    // let li = jQuery('<li></li>');
    // li.text(`${message.from} ${message.createdAt}: ${message.text}`);
    $('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    let message = $('#message');

    socket.emit('createMessage', {
        name: "user",
        text: message.val()
    }, function () {
        message.val('');
    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('not supported by the browser!');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
    }, function (error) {
        console.log("cant get the location " + error);
    });
});