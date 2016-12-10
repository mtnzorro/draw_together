var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var historys = [];

app.use(express.static('public'));

io.on('connection', function(socket){
  console.log("You connected");
    socket.emit("replicate", historys);


  socket.on('draw', function(coords) {
    console.log(coords);
    historys.push(coords);
    socket.broadcast.emit("coordinates", coords);
  });
});

http.listen(8000, function() {
  console.log('listening on *:8000');
});
