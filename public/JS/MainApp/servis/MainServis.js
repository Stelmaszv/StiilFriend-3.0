var MainServis = angular.module("MainServis", ["Notification","url","Helpers"]);
MainServis.service( 'Messages' , [ 'Sesion','$filter','PushUrl',function(Sesion,$filter,PushUrl) {
    this.IdUser=Sesion.Tokken.UserID
    this.countNotReeded= function(ArryMessages){
        var count=0;
        UserId=this.IdUser;
        angular.forEach(ArryMessages, function (array, key) {
            if(ArryMessages[key].reeded==0 && ArryMessages[key].UserId==UserId){
                count++;
            }
        })
        return count;
    }
    this.MarksAssReed =function(Messages){
        idUser=this.IdUser
        MessagesArray=[]
        angular.forEach(Messages, function (array, key) {
           if(Messages[key].reeded==0 && Messages[key].UserId==idUser){
               Messages[key].reeded=1;
               MessagesArray.push(Messages[key].MessagesId)
           }
        })
        return MessagesArray;
    }
    this.MarksAssReedRecived=function(data,Messages){
        angular.forEach(Messages, function (array, key) {
            var Reeded=IfSedToReeded(Messages[key].MessagesId,data)
            if(Reeded){
                Messages[key].reeded=1;
            }
        })
        function IfSedToReeded(id,Messages){
            var ToReturn=false
            angular.forEach(Messages, function (array, key) {
                if(Messages[key]==id){
                    ToReturn=true;
                }
            })
            return ToReturn;
        }
        return Messages;
    }
    this.Add=function(data,Messages){
        NewMessages=Messages.concat(data);
        NewMessages=$filter('orderBy')(NewMessages,'-date')
        return NewMessages;
    }
    this.Prepear=function(arrayinsert,messages){   
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
                if(MemberInCoversation[key].id!=SessionID){
                    set=MemberInCoversation[key].id
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
    }
    this.CountAllMessages=function(Messages){
        sessionID=this.IdUser
        var count=0
        Messages=Messages.AllMessages
        angular.forEach(Messages, function (array, key) {
            if(Messages[key].UserId==sessionID && Messages[key].Deleted==0 ){
              count=count+1;
            }
        })
        return count;
    }
    this.SetMessages=function(array,contentLimit){
        normal=array.NormalMessages
        all=array.AllMessages
        idUser=this.IdUser
        angular.forEach(normal, function (array, key) {
            Data=SetData(normal[key],idUser,all)
            ShowTime=$filter('timestampToDate')(normal[key].date,'short');
            ShowContnet=$filter('tektlengh')(normal[key].Contnet,contentLimit);
            photo=$filter('filtrPhoto')(Data.avatar,'user',Data.sex,idUser);
            normal[key].NotReededCount=CountNotReededFromUser(normal[key],all,idUser);
            normal[key].CountMessFromUser=CountMessFromUser(normal[key],idUser,all);
            normal[key].LoginShow=Data.login
            normal[key].ShowDeleted=SetDeleted(normal[key],idUser,all,normal[key].CountMessFromUser)
            //normal[key].Reeded=DataManipulatin.SetReeded(idUser,all)
            normal[key].ShowAvatar=photo
            normal[key].ShowDate=ShowTime
            normal[key].ShowContnet=ShowContnet
            normal[key].AddressRedded=AddressRedded(normal[key],all);  
        })
        function CountMessFromUser(item,sessionID,all){
            var count=0;
            angular.forEach(all, function (array, key) { 
                if(all[key].UserId==sessionID){
                    count=count+1;
                }
            })
            return count;
        }
        function SetDeleted(item,idUser,all,CountAll){
            var count=0;
            angular.forEach(all, function (array, key) { 
                if(all[key].Deleted==1 && all[key].UserId==idUser){
                    count=count+1
                }
            });
            if(CountAll==count){
                return true;
            }
        }
        function AddressRedded(array,all){
            var Faind=FaindUser(array.MemberInCoversation,idUser)
            return CountNotReededFromUser(array,all,Faind)
        }
        function CountNotReededFromUser(user,all,idUser){
           var Faind=FaindUser(user.MemberInCoversation,idUser)
           var count=0;
           angular.forEach(all, function (array, key) { 
               if(all[key].sendID==Faind && all[key].reeded==0 && all[key].UserId==idUser){
                    count=count+1
               }
           })  
           return count;
        }
        function SetData(GetArray,SesionID,array){
            Data=[]
            UserSend=GetArray.sendID
            angular.forEach(array, function (array, key) {
                if(array.MessagesId==GetArray.MessagesId){
                    if(array.UserId!=SesionID){
                         Data=array
                    }
                }
            })
            return Data
        }
        return array
    }
    function FaindUser(users,idUser){
            var returnID=0;
            angular.forEach(users, function (array, key) {
                if(users[key].id!=idUser){
                    returnID=users[key].id;
                }
            })
            return returnID;
    }  
    this.ClearAllMessages=function(){
        PushUrl.Push('/ClearMessages/'+this.IdUser)
        return [];
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
    this.IdUser=Sesion.Tokken.UserID
    this.ShowMe = function (data){
        return FaindSession(data,this.IdUser)
    }
    function FaindSession(users,idUser){
          var ReturnValue=false;
            angular.forEach(users, function (array, key) {
                if(users[key].UserId==idUser || users[key].deliver==idUser){
                    ReturnValue=true;
                }
            })
            return ReturnValue;
    }
}]);
MainServis.service( 'Chat' ,['Sesion',function(Sesion) {
    this.IdUser=Sesion.Tokken.UserID
    this.Set=function(chat){
        UserId=this.IdUser
        var chatArray=[]
            angular.forEach(chat, function (array, key) {
                if(chat[key].UserID!=UserId){
                    chatArray.push(chat[key])
                }
            })
        return chatArray;
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
}]);


