var MainServis = angular.module("MainServis", ["Notification","url","Helpers"]);
MainServis.service( 'Messages' , [ 'Sesion','$filter','PushUrl','Array','UserInJason','Url',function(Sesion,$filter,PushUrl,Array,UserInJason,Url) {
    this.IdUser=Sesion.Tokken.UserID
    this.Prepare=function(data,all){ 
        UserID=this.IdUser
        var mesages=[]
        var MessRepeat=[];
        angular.forEach(data, function (array, key) {
             if(!Array.repeat(data[key].IdConversation,MessRepeat)){
                 data[key].countNotReeded=undefined;
                 data[key].UsersInConversationJason=JSON.parse(data[key].UsersInConversationJason)
                 if(data[key].UsersInConversationJason.length>2){
                     data[key].AvatarShow=$filter('urlIcons')(data[key].UsersInConversationJason,'MultiChat');
                     data[key].ShowLogin=$filter('UsersToString')(data[key].UsersInConversationJason);
                     data[key].ShowLogin=$filter('tektlengh')(data[key].ShowLogin,23);
                     data[key].UserData=data[key].UsersInConversationJason;
                     data[key].UserData[1].IdConversation=data[key].IdConversation;
                 }else if(data[key].UsersInConversationJason.length==2){
                     FaindUserKey=UserInJason.FaindUserInJasonArray(UserID,data[key].UsersInConversationJason)
                     data[key].UserData=data[key].UsersInConversationJason[FaindUserKey]
                     data[key].UserData.IdConversation=data[key].IdConversation
                     if(data[key].IdSend==UserID){
                         data[key].SqlID=data[key].UsersInConversationJason[FaindUserKey].UserID
                         data[key].ShowLogin=data[key].UsersInConversationJason[FaindUserKey].login
                         data[key].AvatarShow=data[key].UsersInConversationJason[FaindUserKey].avatar
                         Data=Count(all,data[key])
                         data[key].CountNotMessFomUser=Data.CountNotMessFomUser
                         data[key].countNotReeded=Data.countNotReeded
                     }else{
                         data[key].SqlID=data[key].UserID
                         data[key].ShowLogin=data[key].login
                         data[key].AvatarShow=data[key].avatar
                         Data=Count(all,data[key])
                         data[key].CountNotMessFomUser=Data.CountNotMessFomUser
                         data[key].countNotReeded=Data.countNotReeded
                     }
                 }
                 
                 mesages.push(data[key])
                 MessRepeat.push(data[key].IdConversation)
              }
              
        })
        function Count(all,data){
            CountNotMessFomUser=0;
            countNotReeded=0
            angular.forEach(all, function (Array, key) {
                if(typeof Array.UsersInConversationJason=="string"){
                    Array.UsersInConversationJason=JSON.parse(Array.UsersInConversationJason)
                }
                if(Array.UsersInConversationJason.length==2){
                    if(Array.Reed==0 && Array.UserId==UserID && Array.IdSend==data.SqlID){
                        CountNotMessFomUser=CountNotMessFomUser+1;
                    }else if(Array.Reed==0 && Array.UserId==data.SqlID && Array.IdSend==UserID){
                        countNotReeded=countNotReeded+1;
                    }
                }
            })
            DataToReturn={
                "CountNotMessFomUser":CountNotMessFomUser,
                "countNotReeded":countNotReeded
            }
            return DataToReturn
        }
        return mesages;
        /*
                 if(data[key].UsersInConversationJason.length>2){
    
                     data[key].UsersInConversationJason=JSON.parse(data[key].UsersInConversationJason)
                     if(data[key].IdSend==UserID){
                         FaindUserKey=UserInJason.FaindUserInJasonArray(UserID,data[key].UsersInConversationJason)
                         data[key].SqlID=data[key].UsersInConversationJason[FaindUserKey].UserID
                         data[key].ShowLogin=data[key].UsersInConversationJason[FaindUserKey].login
                         data[key].AvatarShow=data[key].UsersInConversationJason[FaindUserKey].avatar
                     }else{
                         data[key].SqlID=data[key].UserID
                         data[key].ShowLogin=data[key].login
                         data[key].AvatarShow=data[key].avatar
                     }
               
                 }else if(data[key].UsersInConversationJason.length==2){
                     console.log('jeden')
                 }
            
                  */
        /*
            if(!Array.repeat(data[key].IdConversation,MessRepeat)){
                data[key].NotReededCount=0;
                data[key].UsersInConversationJason=JSON.parse(data[key].UsersInConversationJason)
                if(data[key].IdSend==UserID){
                    FaindUserKey=UserInJason.FaindUserInJasonArray(UserID,data[key].UsersInConversationJason)
                    if(data[key].UsersInConversationJason.length<3){
                        
                        data[key].ShowLogin=data[key].UsersInConversationJason[FaindUserKey].login
                        data[key].AvatarShow=data[key].UsersInConversationJason[FaindUserKey].avatar
                    }else{
                        data[key].ShowLogin=$filter('UsersToString')(data[key].UsersInConversationJason);
                        data[key].AvatarShow=$filter('urlIcons')(data[key].UsersInConversationJason,'MultiChat');
                    }
                }else{
                    if(data[key].UserId==UserID){
                        FaindUserKey=UserInJason.FaindUserInJasonArray(UserID,data[key].UsersInConversationJason) 
                        if(data[key].UsersInConversationJason.length<3){
                            data[key].ShowLogin=data[key].login
                            data[key].AvatarShow=data[key].avatar
                        }else{
                            data[key].ShowLogin= $filter('UsersToString')(data[key].UsersInConversationJason);
                            data[key].AvatarShow=$filter('urlIcons')(data[key].UsersInConversationJason,'MultiChat');
                        }
                    }
                }
                
                mesages.push(data[key])
                MessRepeat.push(data[key].IdConversation)
            }
            */
        /*
                if(data[key].IdSend==UserID){
                    if(data[key].UserId!=UserID){
                        data[key].UsersInConversationJason=JSON.parse(data[key].UsersInConversationJason)
                        FaindUserKey=UserInJason.FaindUserInJasonArray(UserID,data[key].UsersInConversationJason)
                        data[key].ShowLogin=data[key].UsersInConversationJason[FaindUserKey].login
                        data[key].AvatarShow=data[key].UsersInConversationJason[FaindUserKey].avatar
                        data[key].NotReededCount=0;
                        mesages.push(data[key])
                        MessRepeat.push(data[key].idMessageStan)
                    }
                }else{
                    if(data[key].UserId==UserID){
                        FaindUserKey=UserInJason.FaindUserInJasonArray(UserID,data[key].UsersInConversationJason) 
                        data[key].ShowLogin=data[key].login
                        data[key].AvatarShow=data[key].avatar
                        data[key].NotReededCount=0;
                        mesages.push(data[key])
                        MessRepeat.push(data[key].idMessageStan)
                    }
                }
            */
        /*
          old
        userID=this.IdUser
        angular.forEach(arrayinsert, function (array, key) {
            if(typeof arrayinsert[key].MemberInCoversation=="string"){
                arrayinsert[key].MemberInCoversation=JSON.parse(arrayinsert[key].MemberInCoversation)
            }
            var found=PrepearMessages(messages,userID,arrayinsert[key].MemberInCoversation)
            if(!found){
                messages.push(arrayinsert[key])
            }
            
        })
        function PrepearMessages(array,SessionID,MemberInCoversation){
            var set=0
            angular.forEach(MemberInCoversation, function (array, key) {
                if(MemberInCoversation[key].UserID!=SessionID){
                    set=MemberInCoversation[key].UserID
                }
            })
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
        return messages;
        */
    }
    this.CountMultiChat=function(data,all){
        angular.forEach(data, function (array, key) {
            if(data[key].UsersInConversationJason.length>2){
                Data=Count(all,data[key],data[key].UsersInConversationJason.length)
                data[key].CountNotMessFomUser=Data
                data[key].countNotReeded=1
            }
        })
        function Count(all,data,length){
            CountValue=0;
            SessionID=Sesion.Tokken.UserID
            angular.forEach(all, function (Array, key) {
                if(typeof Array.UsersInConversationJason=="string"){
                    Array.UsersInConversationJason=JSON.parse(Array.UsersInConversationJason)
                }
                if(Array.UsersInConversationJason.length==length){
                    if(data.IdConversation==Array.IdConversation && Array.Reed==0){
                        if(Array.IdSend!=SessionID && Array.UserId==SessionID){
                            CountValue=CountValue+1
                        }
                    }
                }
            
            })
            return CountValue;
        }
        return data;
    }
    this.MarksAssReed=function(Mark){
        var MarkArray=[];
        SessionID=this.IdUser
        angular.forEach(Mark, function (array, key) {
            if(Mark[key].Reed==0 && Mark[key].UserId==SessionID){
                MarkArray.push(Mark[key].MesDetId)
            }
        })
        return MarkArray;
    }
    this.MarksAssReedRecived=function(data,MessagesAll){
        angular.forEach(MessagesAll, function (array, MessAllkey) {
            angular.forEach(data, function (array, Datakey) {
                if(MessagesAll[MessAllkey].MesDetId==data[Datakey]){
                    MessagesAll[MessAllkey].Reed=1;
                }
            })
        })
        return MessagesAll;
    }
    this.ClearMessages=function(){
        Url.GetDataNoReturn('/ClearMessages/'+this.IdUser)
        return [];
    }
    this.CreatePrevievMes=function(messages){
        return messages[0];
    }
    this.SetCountFromUser=function(ArrayCount,Scope){
        UserID=this.IdUser
        angular.forEach(Scope, function (ArrayScope, KeyScope) {
             CountNotMessFomUserCount=0
             countNotReeded=0
             angular.forEach(ArrayCount, function (Array, key) {
                 if(ArrayCount[key].Reed==0 && 
                    ArrayCount[key].UserId==UserID && 
                    ArrayCount[key].IdSend==Scope[KeyScope].SqlID){
                    CountNotMessFomUserCount=CountNotMessFomUserCount+1;
                    
                 }else if(ArrayCount[key].Reed==0 && 
                    ArrayCount[key].UserId==Scope[KeyScope].SqlID && 
                    ArrayCount[key].IdSend==UserID){
                     countNotReeded=countNotReeded+1;
                          
                 }
             })
             Scope[KeyScope].CountNotMessFomUser=CountNotMessFomUserCount;
             Scope[KeyScope].countNotReeded=countNotReeded;
        })
    }
    this.SetNotReedFromUser=function(ArrayCount,Scope){
        UserID=this.IdUser
        angular.forEach(Scope, function (ArrayScope, KeyScope) {
             count=0
             angular.forEach(ArrayCount, function (Array, key) {
                 if(ArrayCount[key].Reed==0 && 
                    ArrayCount[key].UserId==Scope[KeyScope].SqlID && 
                    ArrayCount[key].IdSend==UserID){
                    count=count+1;
                 }
             })
             Scope[KeyScope].countNotReeded=count;
        })
    }
    this.CountMess=function(array){
        count=0;
        angular.forEach(array, function (ArrayScope, KeyScope) {
            count=count+ArrayScope.CountNotMessFomUser
        })
        return count;
    }
}]);
MainServis.service( 'Notification' , [ 'Sesion','$filter','PushUrl',function(Sesion,$filter,PushUrl) {
    this.IdUser=Sesion.Tokken.UserID
    this.SetNotificationRecived = function (arrayRecived,Notifications){
        UserID=this.IdUser
        NewNotificatin=[]
        angular.forEach(arrayRecived, function (array, key) {
            if(array.deliver==UserID){
                NewNotificatin.push(array)
            }
        })
        NewNotificatin=Notifications.concat(NewNotificatin);
        NewNotificatin=$filter('orderBy')(NewNotificatin,'-date')
        return NewNotificatin;
    }
    this.countNotReeded= function (Notification){
        count=0;
        angular.forEach(Notification, function (array, key) {
            if(Notification[key].reeded==0){
                count=count+1;
            }
        })
        return count;
    }
    this.SetNotification = function(array){
        for (i = 0; i < array.length; i++) {
            if(typeof(array[i].contnet)=='string'){
                content= JSON.parse(array[i].contnet)
                array[i].contnet=content;
            }
                switch(array[i].type){
                    case 'UserLike':
                        word=$filter('sex')(array[i].contnet[0].sex,'polubi');
                        photo=$filter('filtrPhoto')(array[i].contnet[0].avatar,'user',array[i].contnet[0].sex);
                        array[i].photo=photo;
                        array[i].name=array[i].contnet[0].login;
                        array[i].icon=$filter('urlIcons')(array[i],'like');
                        array[i].notificationText='<b>'+array[i].name+' </b>'+word+' twój <b>post</b>';
                    break;
                }
        }
        return array;
    }
    this.SignAsReed = function (array){
        for (i = 0; i < array.length; i++) {
            if(array[i].reeded==0){
                array[i].reeded=1;
                PushUrl.Push('/UpdateNotification/'+this.IdUser+'/'+array[i].idNot)
            }
        }
        return array;
    }
    this.ClearAllNotification=function(){
       PushUrl.Push('/ClearNotification/'+this.IdUser)
       return [];
    }
}]);
MainServis.service( 'Show' ,['Sesion',function(Sesion) {
}]);
MainServis.service( 'Chat' ,['Sesion','Array','Messages','$filter','store','$timeout','UserInJason',function(Sesion,Array,Messages,$filter,store,$timeout,UserInJason) {
    this.IdUser=Sesion.Tokken.UserID
    this.GetActiveChat=function(){
        var ActiveChat=store.get('ActiveChat')
        if(!ActiveChat){
           ActiveChat=store.set( 'ActiveChat' ,[]);
        }
        return ActiveChat
    }
    this.BlindMultiChat=function(array){
        User=UserInJason.FaindUserInJasonArray(this.IdUser,array)
        return array[User].UserID
    }
    this.AddToStore=function(arary){
        ActiveChat=store.set('ActiveChat',arary)
    }
    this.Set=function(chat,Messages){
        var NewChat=[]
        UserId=this.IdUser
        angular.forEach(chat, function (array, key) {
            if(Messages.length){
                if(chat[key].UserID!=UserId){
                    angular.forEach(Messages, function (array, MesKey) {
                        if(Messages[MesKey].UsersInConversationJason.length==2){
                            if(Messages[MesKey].SqlID==chat[key].UserID){
                                chat[key].IdConversation=Messages[MesKey].IdConversation
                                chat[key].CountNotReeded=Messages[MesKey].CountNotMessFomUser
                                chat[key].CountNotMessFomUser=Messages[MesKey].countNotReeded
                            }else{
                                chat[key].IdConversation=undefined;
                                chat[key].CountNotReeded=0
                            }
                        }else{
                            chat[key].CountNotReeded=0
                            chat[key].IdConversation=undefined
                        }
                    })
                    NewChat.push(chat[key])
                }
            }else{
                if(chat[key].UserID!=UserId){
                    chat[key].CountNotReeded=0
                    chat[key].IdConversation=undefined
                    NewChat.push(chat[key])
                }
            }
        })
        return NewChat;
        /*
        var NewChat=[]
        UserId=this.IdUser
        angular.forEach(chat, function (array, key) {
            if(Messages.length){
                if(chat[key].UserID!=UserId){
                    angular.forEach(Messages, function (array, MesKey) {
                        if(Messages[MesKey].SqlID==chat[key].UserID){
                            chat[key].IdConversation=Messages[MesKey].IdConversation
                            chat[key].CountNotReeded=Messages[MesKey].CountNotMessFomUser
                            chat[key].CountNotMessFomUser=Messages[MesKey].countNotReeded
                        }else{
                            chat[key].IdConversation=undefined;
                            chat[key].CountNotReeded=0
                        }
                        NewChat.push(chat[key])
                    })
                }
            }else{
                if(chat[key].UserID!=UserId){
                    chat[key].CountNotReeded=0
                    chat[key].IdConversation=undefined
                    NewChat.push(chat[key])
                }
            }
        })
        return NewChat; 
        */
    }
    this.CountOnline=function(chat){
        var count=0;
        angular.forEach(chat, function (array, key) {
            if(chat[key].active==1){
                count=count+1
            }
        })
        return count;
    }
    this.SetSendData=function(array){
        key=UserInJason.FaindUserInJasonArray(this.IdUser,array);
        return array[key]
    }
    this.Create=function(Chused){
        Data={
                 "loadingMessages" :true,
                 "inChat":[Sesion.Tokken],
                 "AddIconShow":false,
                 "SomeoneWriting":false,
                 "TyppingPerson":false,
                 "Chused":Chused,
                 "Messages":[],
        }
        return Data;;
    }
    this.AddUser=function(value,chat){
        var ArrayToreturn=[];
        angular.forEach(chat, function (array, key) {
            if(chat[key].UserID==value){
                ArrayToreturn=chat[key]
            }
        })
        return ArrayToreturn;
    }
    this.ChatNotActive=function(id){
        if(id!=-1){
            if(id){
                if(this.FindUserInChat(id)){
                    return true;
                }
            }else{
                return true;
            }
        }
    }
    this.FindUserInChat=function(id){
        DataIds=document.querySelectorAll('[chat-data-id]')
        count=0
        for (let DataId of DataIds) {
            GetData=DataId.getAttribute('chat-data-id')
            if(id==DataId.getAttribute('chat-data-id')){
                count=count+1;
            }
        }
        if(count==0){
            return true;
        }
    }
    this.ScrolDown=function(id){
        if(!id){
            DataIds=document.querySelectorAll('.messages-section')
            for (let DataId of DataIds) {
                DataId.scrollTop=DataId.scrollHeight+50;
            }
        }else{
            DataIds=document.querySelectorAll('[chat-data-id]')
            for (let DataId of DataIds) {
                GetID=DataId.getAttribute('chat-data-id')
                if(GetID==id){
                    data=DataId.querySelector('.messages-section') 
                    if(data.scrollHeight){
                        data.scrollTop= data.scrollHeight+50; 
                    }
                }
            }
        }
    }
    this.UpadataConversationChat=function(chat,Datauser,id){
        angular.forEach(chat, function (array, key) {
            if(chat[key].UserID==Datauser.UserID){
                chat[key].IdConversation=id
            }
        })
        return chat
    }
    this.UpadataConversationChats=function(ActiveChat,ChatList){
        angular.forEach(ActiveChat, function (arrayActiveChat, key) {
            angular.forEach(ChatList, function (arrayChatList, key) {
                if(arrayActiveChat.inChat.length==2){
                    angular.forEach(arrayActiveChat.inChat, function (inChat, key) {
                         if(inChat.UserID==arrayChatList.UserID){
                             arrayChatList.IdConversation=arrayActiveChat.IdConversation
                         }
                    })
                }
            })
       })
       return ChatList;
    }
    this.ActiveChat=function(id,chat){
        var index=undefined
        angular.forEach(chat, function (array, key) {
            if(array.IdConversation==id){
                index=key;    
            }
        })
        return index;
    }
    this.ChatShow=function(Addres){
        if(typeof Addres == "string"){
            Addres=JSON.parse(Addres)
        }
        Userid=this.IdUser
        var value=false;
        angular.forEach(Addres, function (array, key) {
            if(Addres[key].UserID==Userid){
                value=true;    
            }
        })
        return value;
    }
    this.UserInchat=function(id,inchat){
        var ToReturn=false;
        angular.forEach(inchat, function (array, key) {
            if(inchat[key].UserID==id){
                ToReturn=true;
            }
        })
        return ToReturn;
    }
    this.ResetIdConversation=function(list){
        angular.forEach(list, function (arrayChatList, key) {
            list[key].IdConversation=undefined;
        })
        return list
    }
    this.SetAllMessReeded=function(index){
        VarToReturn=true;
        UserID=this.IdUser;
        if(index.inChat.length==2){
            lastMes=index.Messages[length]
            console.log(lastMes)
            if(lastMes.IdSend==UserID){
                angular.forEach(index.inChat, function (array, key) {
                    if(array.UserID!=UserID){
                        if(array.CountNotMessFomUser>0){
                            VarToReturn=false;
                        }
                    }
                })
            }
        }else{
            VarToReturn=false;
        }
        return VarToReturn;
    }
    this.SetReededChat=function(Chat){
        angular.forEach(Chat, function (array, key) {
            Chat[key].CountNotReeded=0;
        })
        return Chat
    }
    this.ShowAllReeded=function(Chat,lastMes){
        UserID=this.IdUser
        if(!lastMes){
            lastMes=Chat.Messages[0]
        }
        if(lastMes.IdSend==UserID){
            return true;
        }
    }
    this.UpdataToMobileNotReededList=function(array){

        var NotReededList=[]
        angular.forEach(array, function (chat, key) {
            if(chat.CountNotReeded){
                NotReededList.push(chat);
            }
        })
        return NotReededList;
    }
    this.SetActiveChat=function(ActiveChat){
        UserID=this.IdUser;
        angular.forEach(ActiveChat, function (array, ActiveChatkey) {
            angular.forEach(array.inChat, function (user, key) {
                if(user.UserID==UserId){
                    ActiveChat[ActiveChatkey].SetAllMessReeded=true
                }
            })
        })
        return ActiveChat;
    }
    this.GetUserFromChat=function(ActiveChat){
        UserID=this.IdUser;
        Var=false;
        angular.forEach(ActiveChat, function (user, ActiveChatkey) {
            if(user.UserID!=UserId){
                Var=user.UserID
            }
        })
        return Var;
    }
    this.SetActiveChatItem=function(Array){
        var item=[]
        angular.forEach(Array, function (Chat, ActiveChatkey) {
            if(Chat.Active){
                item=Chat;
            }
        })
        return item;
    }

    this.SetActiveChatMobile=function(id,Array){
        angular.forEach(Array, function (Chat, ActiveChatkey) {
            if(Chat.IdConversation!=id){
                Array[ActiveChatkey].Active=false;
            }
        })
        return Array;
    }
    function AddUserToChat(value,chat){
        var ArrayToreturn=[];
            angular.forEach(chat, function (array, key) {
                if(chat[key].UserID==value){
                    ArrayToreturn=chat[key]
                }
            })
            return ArrayToreturn;
    }
}]);




