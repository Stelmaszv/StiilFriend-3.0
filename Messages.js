var GetMessages = function GetMessages(io,Faind){
    MessagesSocket(io);
    MessagesRounts();
    MesagessMigration(); 
    function MessagesRounts(){
        app.get('/ClearMessages/:UserID', function(req, res){
            let ClearMessages =`UPDATE messagesSend SET Deleted = 1 where UserId =  ${req.params.UserID}`;
            let ClearMessagesReeded =`UPDATE messagesSend SET reeded = 1 where UserId =  ${req.params.UserID}`;
            db.query(ClearMessages);
            db.query(ClearMessagesReeded);
        });
    }
    function MessagesSocket(io){
       io.on('connection', function(socket){
            socket.on('request-messages',function(data){
                blind=data.UserID
                let GetUserMessages='SELECT * FROM messagessend INNER JOIN messages on messages.idMessageStan=messagessend.MessagesId INNER join users on messagessend.UserId =users.UserID where messages.MemberInCoversation like "%'+blind+'%" ORDER BY messages.date DESC ';
                var messages=[]
                db.query(GetUserMessages, function (err, result, fields) {
                     
                     socket.emit('messages',result)
                });
            })
            socket.on('Allmessages',function(data){
                
                let Allmessages=`SELECT * FROM messagessend INNER JOIN messages on messages.idMessageStan=messagessend.MessagesId INNER join users on messages.sendID =users.UserID WHERE messagessend.UserId=${data.UserID} and messagessend.Deleted=0 ORDER BY messages.date DESC`;
                var messages=[]
                db.query(Allmessages, function (err, result, fields) {
                    for (var i = 0; i < result.length; i++) {
                        var FaindInArray= Faind(result[i].sendID,messages)
                        if(!FaindInArray){
                            messages.push(result[i])
                        }
                    }
                   socket.emit('Allmessages',messages)
                });
            })
            socket.on('InsertMessage',function(data,userData){
                let SqlData={
                    "Contnet":data.content,
                    "date":   data.time,
                    "sendID":data.sendID,
                    "MemberInCoversation":data.address,
                    "MemberInCoversationnormal":data.MemberInCoversationnormal
                };
                let InsertMessages = 'INSERT INTO messages SET ?'
                db.query(InsertMessages,SqlData,function(err, result, field){
                    data.address = JSON.parse(data.address)
                    show=result.insertId
                    for (i = 0; i < data.address.length; i++) {
                        if(data.sendID==data.address[i].id){
                            reeded=1;
                        }else{
                            reeded=0;
                        }
                        let InsertMessagesData={
                            "MessagesId":result.insertId,
                            "UserId":   data.address[i].id,
                            "reeded":   reeded
                        };
                        let InsertMessagesSend='INSERT INTO messagessend SET ?'
                        db.query(InsertMessagesSend,InsertMessagesData)
                    }
                    let SelectInsertedMessages = `SELECT * FROM messagessend INNER JOIN messages on messages.idMessageStan=messagessend.MessagesId INNER join users on messagessend.UserId =users.UserID  where MessagesId = ${show}`
                    db.query(SelectInsertedMessages,function(err, result, field){
                        io.emit('AddMessages',result)      
                    })
                });
            })
            socket.on('MarkAsReeded',function(data,session){
                userID=session.UserID
                io.emit('MarkAsReeded',data)
                let MarkAsReeded =`UPDATE messagesSend SET reeded = 1 where UserId =  ${userID}`;
                db.query(MarkAsReeded);
            })
        });
    }
    function MesagessMigration(){
        let Messages ='CREATE  TABLE IF NOT EXISTS messages (idMessageStan int NOT NULL AUTO_INCREMENT,PRIMARY KEY (`idMessageStan`),Contnet text,date datetime,sendID int,	MemberInCoversation text,MemberInCoversationnormal text   COLLATE utf8_polish_ci NOT NULL)';
        db.query(Messages);
        let sqlMessagesSend ='CREATE  TABLE IF NOT EXISTS messagesSend (idMessageSend int NOT NULL AUTO_INCREMENT,PRIMARY KEY (`idMessageSend`),MessagesId int NOT NULL,UserId int NOT NULL,Deleted int NOT NULL,reeded int NOT NULL COLLATE utf8_polish_ci NOT NULL)';
        db.query(sqlMessagesSend);
    }
    function PrepearMessages(array,SessionID,MemberInCoversation){
        Member = JSON.parse(MemberInCoversation)
        for (var i = 0; i < Member.length; i++) {
            if(Member[i].id!=SessionID){
                var set=Member[i].id
            }
        }
        var count=0;
        for (var i = 0; i < array.length; i++) {
            var inarray=SessionID+' '+set
            var inarray2=set+' '+SessionID
            if(array[i].MemberInCoversationnormal==inarray || array[i].MemberInCoversationnormal==inarray2){
                count++
            }
        }
        return count;
    }
}
module.exports=GetMessages;
