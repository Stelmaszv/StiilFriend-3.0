var GetMessages = function GetMessages(io,Faind){
    MessagesSocket(io);
    MessagesRounts();
    MesagessMigration(); 
    function MessagesRounts(){
        app.get('/ClearMessages/:UserID', function(req, res){
            let ClearMessages =`UPDATE messagedetails SET Deleted = 1 where UserId =  ${req.params.UserID}`;
            db.query(ClearMessages);
            let ClearMessagesReeded =`UPDATE messagedetails SET reed = 1 where UserId =  ${req.params.UserID}`;
            db.query(ClearMessagesReeded);
        });
        app.get('/CountNotReededMess/:id/:SesID', function(req, res){
            let CountSql= `SELECT COUNT(MesDetId) CountReeded FROM messagedetails where Reed=0 and UserId=${req.params.id}`
            db.query(CountSql,function(err, result, field){
                var data={
                    result:result[0].CountReeded*1,
                    SesId: req.params.SesID*1
                }
                res.send(data)
            });
        });
        app.get('/CountNotMessFomUser/:id/:Sessionid/:ConersationID', function(req, res){
            let CountSql= `SELECT count('idCoversation') as resultsql FROM conversation INNER JOIN conversationmessages on conversationmessages.IdMes = conversation.LastMessId INNER JOIN messagedetails on messagedetails.ConversationId = conversationmessages.IdMes where conversation.IdConversation=${req.params.ConersationID} and reed = 0 and messagedetails.UserId=${req.params.ConersationID} and conversationmessages.IdSend=${req.params.id}`
            db.query(CountSql,function(err, result, field){
                console.log(result)
                res.send(result)
            })
        })
        app.post('/IFConversationExist', function(req, res){
            more='';
            for (i = 0; i < req.body.length; i++) {
                if(i==0){
                    more+='where UsersInConversation like "%'+req.body[i].UserID+'%"';
                }else{
                    more+=' And UsersInConversation like "%'+req.body[i].UserID+'%"';
                }
            }
            let GetConversation='SELECT * FROM `conversation` '+more+''
            db.query(GetConversation,function(err, result, field){
                if(result.length>0){
                    Send=0
                    for (i = 0; i < result.length; i++) {
                        start=i
                        Jason=JSON.parse(result[i].UsersInConversationJason)
                        if(Jason.length==req.body.length){
                            indo=0;
                            countAll=0;
                            do {
                                countAll=countAll+ifInArray(Jason[indo].UserID,req.body)
                                indo++;
                            }
                            while (indo < Jason.length);
                            console.log(countAll,req.body.length)
                            if(countAll==req.body.length){
                                i=start;
                                Send=result[i].IdConversation
                            }
                        }
                    }
                    console.log(Send)
                    if(Send==0){
                        res.send('Create') 
                    }else{
                         data={
                            "Stan":'GetID',
                            "ID"  :Send
                        }
                        res.send(data)
                    }
                }else{
                    res.send('Create') 
                }
            })
            
        })
        app.post('/CreateConversation', function(req, res){
             InsertForm=JSON.stringify(req.body)
             let SqlData={
                        "LastMessId":0,
                        "UsersInConversation":   GetUserId(req.body),
                        "UsersInConversationJason":InsertForm,
             };
            let CreateConversation='INSERT INTO conversation SET ?'
            db.query(CreateConversation,SqlData)
            /*
            more='';
            for (i = 0; i < req.body.length; i++) {
                if(i==0){
                    more+='where UsersInConversation like "%'+req.body[i].UserID+'%"';
                }else{
                    more+=' And UsersInConversation like "%'+req.body[i].UserID+'%"';
                }
            }
            let GetConversation='SELECT * FROM `conversation` '+more+''
            hederSend={};
            db.query(GetConversation,function(err, result, field){
                if(result.length>0){
                    for (i = 0; i < result.length; i++) {
                        Jason=JSON.parse(result[i].UsersInConversationJason)
                        if(Jason.length==req.body.length){
                            heder=result[i].IdConversation
                            hederSend={
                                    heder:heder,
                                    Stan:'load'
                            }
                        }else{
                            console.log('Wrong Chat lenght')
                            WrongLenght=true;
                        }
                    }
                    console.log(WrongLenght)
                }else if(WrongLenght || result.length==0){
                    console.log('empty  result')
                    InsertForm=JSON.stringify(req.body)
                    let SqlData={
                        "LastMessId":0,
                        "UsersInConversation":   GetUserId(req.body),
                        "UsersInConversationJason":InsertForm,
                    };
                    let CreateConversation='INSERT INTO conversation SET ?'
                    db.query(CreateConversation,SqlData,function(err, result, fields){
                        heder=result.insertId
                        hederSend={
                            heder:heder,
                            Stan:'Create'
                        }
                    })
                }
                res.send(hederSend) 
                
            });
            */
        });
        app.get('/LoadConversation/:ID', function(req, res){
            let GetMessages =`SELECT * FROM conversationmessages INNER join users on users.UserID=conversationmessages.IdSend  WHERE  ConversationidMesages =  ${req.params.ID} ORDER BY Time DESC`;
            db.query(GetMessages,function(err, result, field){ 
                data={
                    result:result,
                    id:req.params.ID
                }
                res.send(data)
            })
        });
    }
    function ifInArray(id,users){
            count=0;
            for (i = 0; i < users.length; i++) {
                if(users[i].UserID==id){
                    count=1;
                }
            }
            return count;
        }
    function GetUserId(users){
        var userid='';
        for (i = 0; i < users.length; i++) {
            userid+=users[i].UserID+' '
        }
        return userid
    }
    function MessagesSocket(io){
       io.on('connection', function(socket){
            socket.on('request-messages',function(SessionData){
                /*
                blind=data.UserID
                let GetUserMessages='SELECT * FROM messagessend INNER JOIN messages on messages.idMessageStan=messagessend.MessagesId INNER join users on messagessend.UserId =users.UserID where messages.MemberInCoversationnormal like "%'+blind+'%" ORDER BY messages.date DESC ';
                var messages=[]
                db.query(GetUserMessages, function (err, result, fields) {
                     socket.emit('messages',result)
                });
                */
                SessionID=SessionData.UserID
                var MessagesList=[];
                let GetConversation='SELECT * FROM `conversation` INNER JOIN conversationmessages on conversationmessages.IdMes = conversation.LastMessId INNER join users on users.UserID = conversationmessages.IdSend INNER JOIN messagedetails on messagedetails.ConversationId = conversationmessages.IdMes where conversation.UsersInConversation like "%'+SessionID+'%"';
                db.query(GetConversation, function (err, result, fields) {
                    FirstResult=result
                    let DataToCount='SELECT * FROM `conversationmessages` INNER join conversation ON conversation.IdConversation =conversationmessages.ConversationidMesages INNER join messagedetails on messagedetails.ConversationId=conversationmessages.IdMes where conversation.UsersInConversation like "%'+SessionID+'%"'
                    db.query(DataToCount, function (err, result, fields) {
                        SecundResult=result
                        MessagesList={
                            FirstResult:FirstResult,
                            SecundResult:SecundResult

                        }
                        socket.emit('messages',MessagesList)
                    })
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
                    "Content":data.content,
                    "Time":   data.time,
                    "IdSend":data.IdSend,
                    "ConversationidMesages":data.ConversationidMesages
                };
                let InsertMessages = 'INSERT INTO conversationmessages SET ?'
                db.query(InsertMessages,SqlData,function(err, result, field){
                    let ClearMessages =`UPDATE conversation SET LastMessId = ${result.insertId} WHERE IdConversation = ${SqlData.ConversationidMesages}`;
                    db.query(ClearMessages);
                    mess=result.insertId
                    users=data.UsersInChat
                    LostInsert=result.insertId
                    for (i = 0; i < users.length; i++) {
                        reeded=0
                        if(users[i].UserID==data.IdSend){
                            reeded=1;
                        }
                        dataloop={
                            "ConversationId" : LostInsert,
                            "UserId"         : users[i].UserID,
                            "Reed"           : 0
                        }
                        let InsertDetels = 'INSERT INTO messagedetails SET ?'
                        db.query(InsertDetels,dataloop)
                        
                    }
                    let SelectInsertedMessages =`SELECT * from conversationmessages INNER join conversation on conversation.IdConversation = conversationmessages.ConversationidMesages INNER join users on users.UserID = conversationmessages.IdSend where conversationmessages.IdMes =  ${mess}`;
                    db.query(SelectInsertedMessages,function(err, result, field){
                        io.emit('AddMessages',result) 
                    })
                });
                
            })
            socket.on('MarkAsReeded',function(session,id){
                userID=session.UserID
                if(id){
                    let GetReededMessages=`SELECT * FROM messagedetails inner join conversationmessages on conversationmessages.ConversationidMesages=messagedetails.ConversationId where ConversationId= ${id} and UserId=${userID}`
                    db.query(GetReededMessages,function(err, result, field){
                        for (i = 0; i < result.length; i++) {
                            let MarkAsReeded =`UPDATE messagedetails SET reed = 1 where UserId =  ${result[i].	MesDetId}`;
                            db.query(MarkAsReeded);
                        }
                    })
                }else{
                    let MarkAsReeded =`UPDATE messagedetails SET reed = 1 where UserId =  ${userID}`;
                    db.query(MarkAsReeded);
                }
                io.emit('MarkAsReeded')
            })
        });
    }
    function MesagessMigration(){
        let Messages ='CREATE  TABLE IF NOT EXISTS messages (idMessageStan int NOT NULL AUTO_INCREMENT,PRIMARY KEY (`idMessageStan`),Contnet text,date datetime,sendID int,	MemberInCoversation text,MemberInCoversationnormal text   COLLATE utf8_polish_ci NOT NULL)';
        db.query(Messages);
        let sqlMessagesSend ='CREATE  TABLE IF NOT EXISTS messagesSend (idMessageSend int NOT NULL AUTO_INCREMENT,PRIMARY KEY (`idMessageSend`),MessagesId int NOT NULL,UserId int NOT NULL,Deleted int NOT NULL,reeded int NOT NULL COLLATE utf8_polish_ci NOT NULL)';
        db.query(sqlMessagesSend);
    }
    function GetIdFromJoson(array){
        array = JSON.parse(array)
        var arratstring=''
        for (var i = 0; i < array.length; i++) {
            if(i==0){
                arratstring+=array[i].UserID
            }else{
                arratstring+=' '+array[i].UserID
            }
        }
        return arratstring
    }
}
module.exports=GetMessages;
