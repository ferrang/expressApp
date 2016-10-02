var app = require("./app");
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

io.on('connection', function (socket) {
  socket.emit('serverCon', { msg: 'hello from node.js server :)' });
  
  setInterval(function(){
    socket.emit('date', {'date': new Date()});
  }, 1000);

  socket.on('clientMsg', function (data) {
      console.log("Server read from client:", data);
  });
});

console.log("Running...");