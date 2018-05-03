var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var DBConnect= require('./Mysql');
var Routs= require('./Routs');
var Auth= require('./Auth');
var DB = DBConnect();
var Routs = Routs(app);
var Auth=Auth(app,DB);
app.use(express.static('public'))
app.use('/static', express.static('public'))
http.listen(port, function(){
  console.log('listening on *:' + port);
});
