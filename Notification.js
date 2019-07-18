var GetNotification = function GetMessages(io){
    NotificationSocket();
    NotificationRouts();
    NotificationMigration();
    function NotificationSocket(){
        io.on('connection', function(socket){
            socket.on('request-Notification',function(data){
                let sql = `SELECT * FROM notifications WHERE deliver = ${data.UserID}`;
                db.query(sql, function (err, result, fields) {
                   socket.emit('notification',result)
                });
            })
            socket.on('NotificationInsert',function(data){
                 let SqlData={
                    "Contnet"  :data.content,
                    "date"     :data.date,
                    "deliver"  :data.deliver,
                    "type"     :data.type,
                    "reeded"   :0
                };
                let InsertNotification = 'INSERT INTO notifications SET ?'
                db.query(InsertNotification,SqlData,function(err, result, field){
                    show=result.insertId
                        let SelectNotification = `SELECT * FROM notifications where idNot = ${show}`
                        db.query(SelectNotification,function(err, result, field){
                            io.emit('NotificationAdd',result)      
                        })
                })
            })
        });
    }
    function NotificationRouts(){
        app.get('/UpdateNotification/:userid/:notid', function(req, res){
            let Sqlupdata= `UPDATE notifications SET reeded = 1 WHERE idNot = ${req.params.notid};`;
            db.query(Sqlupdata);
        });
        app.get('/ClearNotification/:id', function(req, res){
            let Delete= `DELETE FROM  notifications WHERE deliver = ${req.params.id};`;
            db.query(Delete);
        });
    }
    function NotificationMigration(){
        let sql ='CREATE  TABLE IF NOT EXISTS notifications (idNot int NOT NULL AUTO_INCREMENT,PRIMARY KEY (`idNot`),	deliver int NOT NULL,date datetime,reeded int,contnet text,type varchar(50) COLLATE utf8_polish_ci NOT NULL)';
        db.query(sql);
    }
}
module.exports=GetNotification;