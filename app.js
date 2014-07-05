var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use(express.static('./public'));

var clientSocket = null;

process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data) {
  console.log(data);
  if(clientSocket) {
    clientSocket.emit('acc', JSON.parse(data));
  }
});

io.on('connection', function(socket) {
  console.log('Socket connected');
  clientSocket = socket;
});

http.listen(3000);