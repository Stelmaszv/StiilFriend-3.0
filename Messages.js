var GetMessages = function GetMessages(io){
    Messages(io);
    MesagessMigration();
}
function Messages(io){
   io.on('connection', function(socket){
        socket.on('request-messages',function(data){
            db.query("SELECT * FROM `messages` INNER join users on users.UserID=messages.sendID ORDER BY `messages`.`date` DESC", function (err, result, fields) {
                socket.emit('messages',result)
            });
        })
        socket.on('message',function(data){
            MessageStan = JSON.stringify(data.MessageStan)
            let SqlData={
                Contnet:data.Contnet,
                MessageStan:MessageStan,
                date:data.time,
                sendID:data.sendID
                
            };
            let sql = 'INSERT INTO messages SET ?'
            db.query(sql,SqlData,function(err, result, field){
                let sqlInsert = `SELECT * FROM messages INNER join users on users.UserID=messages.sendID WHERE messages.IdMessge  = ${result.insertId}`;
                db.query(sqlInsert,function(err, result, field) {


                   MessageStan = JSON.parse(result[0].MessageStan)
                   result[0].MessageStan=MessageStan;

                   io.emit('message',result[0])
                });
            });  
        })
        socket.on('MarkAsReeded',function(data){
                for (i = 0; i < data.length; i++) {
                    for (i2 = 0; i2 < data[i].MessageStan.length; i2++) {
                        MessageStan = JSON.stringify(data[i].MessageStan)
                        let updata= `UPDATE messages SET MessageStan ='${MessageStan}' where IdMessge = ${data[i].IdMessge}`;
                        db.query(updata);
                    }
                }  
                io.emit('MarkAsReeded',data)
        })
    });
}
function MesagessMigration(){
    let sql ='CREATE  TABLE IF NOT EXISTS messages (idMessage int NOT NULL AUTO_INCREMENT,PRIMARY KEY (`idMessage`),idDeliver int NOT NULL,idsend int NOT NULL,contnet text COLLATE utf8_polish_ci NOT NULL)';
    db.query(sql);
}
module.exports=GetMessages;
