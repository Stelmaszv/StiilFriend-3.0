var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var DBConnect= require('./Mysql');
var Routs= require('./Routs');
var Auth= require('./Auth');
var Chat= require('./chat');
var DB = DBConnect();
var Routs = Routs(app,DB);
var Auth=Auth(app,DB);
Chat=Chat(io)
var GetMessages= require('./Messages');
var FaindInArray= require('./FaindInArray');
var GetNotification= require('./Notification');
var GetDashboard= require('./Dashboard');
var GetDashboard = GetDashboard()
var GetNotification = GetNotification(io)
var GetMessages=GetMessages(io,FaindInArray);
app.use(express.static('public'))

app.use('/static', express.static('public'))
http.listen(port, function(){
  console.log('listening on *:' + port);
});
