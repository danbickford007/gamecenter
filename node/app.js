var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

queue = []


game_ids = 0
games = []

server.listen(3001);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

  socket.on('playermove', function (data) {
    if(socket.opponent)
      socket.opponent.emit('news', {coors: data, game_id: socket.game_id});
    // socket.emit('news', {coors: data, game_id: socket.game_id});
  });

  socket.on('set_user', function (user) {
    socket.user = user;
    var socks = io.sockets.sockets;

    for(var i = 0; i < socks.length; i++){
      if(!socks[i].inGame && socks[i].id != socket.id){
        socks[i].inGame = true
        socket.inGame = true
        socks[i].character = 'X'
        socket.character = 'O'
        socks[i].opponent = socket;
        socks[i].opponent_user = user;
        socket.opponent_user = socks[i].user; 
        socket.opponent = socks[i];
        break;
      }      
    }
    
    console.log('CHECK IF FOUND GAME....');
    console.log(socket.inGame);
    if(!socket.inGame){
      socket.emit('wait', 'waiting for player...');
    }else{
      var name = socket.opponent_user ? socket.opponent_user.email : 'unknown'
      socket.emit('stats', 'In Game With ' + name)
      socket.opponent.emit('stats', 'In Game With '+socket.user.email)
      socket.emit('setcharacter', socket.character);
      socket.opponent.emit('setcharacter', socket.opponent.character);
    }

  });
});
