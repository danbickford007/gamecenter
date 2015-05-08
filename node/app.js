var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Board = require('./board');

queue = []



game_ids = 0
games = []

server.listen(3001);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

  socket.on('playermove', function (data) {
    console.log(data);
    coors = {}
    position = ''
    if(data.x >= 0 && data.x <= 100 && data.y >= 50 && data.y <= 120){
      console.log("A1")
      position = 'A1'
      coors.x = 47.5;
      coors.y = 80;
    }else if(data.x >= 100 && data.x <= 200 && data.y >= 50 && data.y <= 115){
      console.log("A2")
      position = 'A2'
      coors.x = 150;
      coors.y = 80;
    }else if(data.x >= 200 && data.x <= 300 && data.y >= 50 && data.y <= 115){
      console.log("A3")
      position = 'A3'
      coors.x = 250;
      coors.y = 80;
    }else if(data.x >= 0 && data.x <= 100 && data.y >= 120 && data.y <= 218){
      console.log("B1")
      position = 'B1'
      coors.x = 50;
      coors.y = 172;
    }else if(data.x >= 100 && data.x <= 200 && data.y >= 120 && data.y <= 218){
      console.log("B2")
      position = 'B2'
      coors.x = 150;
      coors.y = 169;
    }else if(data.x >= 200 && data.x <= 300 && data.y >= 120 && data.y <= 218){
      console.log("B3")
      position = 'B3'
      coors.x = 250;
      coors.y = 167;
    }else if(data.x >= 0 && data.x <= 100 && data.y >= 220 && data.y <= 300){
      console.log("C1")
      position = 'C1'
      coors.x = 46;
      coors.y = 265;
    }else if(data.x >= 100 && data.x <= 200 && data.y >= 220 && data.y <= 300){
      console.log("C2")
      position = 'C2'
      coors.x = 150;
      coors.y = 263;
    }else if(data.x >= 200 && data.x <= 300 && data.y >= 220 && data.y <= 300){
      console.log("C3")
      position = 'C3'
      coors.x = 250;
      coors.y = 266;
    }
    console.log(socket.board);
    console.log(position);
    console.log(board[position]);

    if(!board.evaluate(position, socket.character)){
      socket.emit('alert', 'bad move...');
    } else if(board.success != false){
      if(socket.opponent)
        socket.opponent.emit('success', socket.board.success_coors);
        socket.opponent.emit('alert', 'You Lose');
      socket.emit('success', socket.board.success_coors);
      socket.emit('alert', 'You Win!!!');
      if(socket.opponent){
        socket.opponent.emit('news', {coors: coors, game_id: socket.game_id, character: socket.character});
      }
      socket.emit('news', {coors: coors, game_id: socket.game_id, character: socket.character});
    }else{
      if(socket.opponent){
        socket.opponent.emit('news', {coors: coors, game_id: socket.game_id, character: socket.character});
      }
      socket.emit('news', {coors: coors, game_id: socket.game_id, character: socket.character});
    }


  });

  socket.on('set_user', function (user) {
    socket.user = user;
    var socks = io.sockets.sockets;

    for(var i = 0; i < socks.length; i++){
      if(!socks[i].inGame && socks[i].id != socket.id){
        board = new Board();
        socks[i].board = board;
        socket.board = board;
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
