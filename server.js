
console.log("My Server is Running");

var express = require('express');

var app = express();

//  var server = app.listen(3000);
var port = process.env.PORT || 3000;
var server = app.listen(port);


app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);



function newConnection(socket){
    console.log("new connection! " + socket.id);

    socket.on('circle', mouseMsg);
    socket.on('emoji', emojiMsg);

    function mouseMsg(data){

        socket.broadcast.emit('circle', data);
    }

    function emojiMsg(data){

        socket.broadcast.emit('emoji', data);
    }
}
