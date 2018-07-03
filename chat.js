var Chat = function Chat(io){
    ChatSocket();
    function ChatSocket(){
        io.on('connection', function(socket){
            socket.on('SomeoneTypping',function(data){
                io.emit('SomeoneTypping',data)
            })
            socket.on('StopTypping',function(data){
                io.emit('StopTypping',data)
            })
            socket.on('request-chat',function(data){
                var ID=data.UserID
                let UpdateMystan=`UPDATE users SET active = 1 WHERE UserID = ${ID}`;
                db.query(UpdateMystan)
                let Friends='SELECT * FROM `users`';
                db.query(Friends, function (err, result, fields) {
                    io.emit('load-chat',result)
                })
            })
            socket.on('RemuerFromChat', function(data,UpdataTime){

                var ID=data.UserID
                let UpdateMystan=`UPDATE users SET active = 0 WHERE UserID = ${ID}`;
                let UpdateTime=`UPDATE users SET lostlogin = '${UpdataTime}' WHERE UserID = ${ID}`;
                db.query(UpdateMystan)
                db.query(UpdateTime)
                let Friends='SELECT * FROM `users`';
                db.query(Friends, function (err, result, fields) {
                    io.emit('load-chat',result)
                })

            }); 
        })
      
    }
}
module.exports=Chat;