let socket = io();
console.log("omad to js");

function scrollDown() {
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');

    let clientHeight = messages.prop('clientHeight');
    let scrollHeight = messages.prop('scrollHeight');
    let scrollTop = messages.prop('scrollTop');
    let newMessageHeight = newMessage.innerHeight();
    let lastNewMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastNewMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log("connected to the server");

    console.log(window.location.search);
    let params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            window.location.href = '/';
        } else {
            console.log("no error!");
        }
    })
});

socket.on('disconnect', function () {
    console.log("server was disconnected");
});

socket.on('newMessage', function (message) {
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: message.createdAt
    });
    // let li = jQuery('<li></li>');
    // li.text(`${message.from} ${message.createdAt}: ${message.text}`);
    $('#messages').append(html);
    scrollDown();
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