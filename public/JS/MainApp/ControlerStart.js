var StartControlers = angular.module("Start", ["Notification","Translate","Url"]);
StartControlers.controller("login",['$scope','$http','Errors','Forms','Componets','Sesion','$location',function($scope,$http,Errors,Forms,Componets,Sesion,$location){
    if(!Sesion.Tokken.login){
        Componets.loadSessinCompnent();
        $scope.ErorrsLogin=[
            {value:  false ,'name':'EmptyData'},
            {value:  false ,'name':'wrongpass'},
            {value:  false ,'name':'ban'}
        ];
        $scope.ErorrsLoginNotification=Errors.Switch($scope.ErorrsLogin);
        var loging= function loging(){
            $scope.LoginForms=[
                {value: $scope.loginglogin,     'name':'login'      , 'stan': false, 'required':true, 'type':'text','DBrow':'login' },
                {value: $scope.logingpassword,  'name':'password'   , 'stan': false, 'required':true, 'type':'text','DBrow':'password' },
            ]
            $scope.ErorrsLoginNotification=Errors.Switch($scope.ErorrsLogin);
            $scope.ErorrsLoginNotification=Forms.Empty($scope.LoginForms,$scope.ErorrsLogin);
            if(!$scope.ErorrsLogin[0].value){
                $scope.LoginForms=Forms.ConvertToSent($scope.LoginForms)
                $http.post( '/login',$scope.LoginForms).then( function( loging ){
                    if(loging.data.length==undefined){
                        $scope.ErorrsLogin=[
                            {value:  $scope.ErorrsLogin[0].value ,'name':'EmptyData'},
                            {value:  loging.data.wrongpass ,'name':'wrongpass'},
                            {value:  loging.data.ban ,'name':'ban'}
                        ];
                        $scope.ErorrsLoginNotification=Errors.Switch($scope.ErorrsLogin);
                    }else{
                        Sesion.CreateSession(loging.data)
                        location.reload()
                    }
                });
            }
        }
        let logingStart = document.querySelector('.logingStart');
        logingStart.addEventListener('click',function(){       
                loging();
        })
    }else{
        window.location.assign("#!/")
    }                                 
}]);
StartControlers.controller("Register-Conroller",['$scope','$http','Errors','Forms','Sesion','Register','TimeConvert','Array',function($scope,$http,Errors,Forms,Sesion,Register,TimeConvert,Array){
    $scope.RegisterForms=[
            {value:$scope.login,'name':'login','stan': false, 'required':true, 'type':'text','DBrow':'login' },
            {value: document.querySelector('.PasswordFormRegister').value,  'name':'password'   , 'stan': false, 'required':true, 'type':'password','DBrow':'password' },
            {value: document.querySelector('.EmailRegister').value,  'name':'email'   , 'stan': false, 'required':true, 'type':'email','DBrow':'email' },
            {value: document.querySelector('.Passwordpasswordrepeat').value,  'name':'passwordMatch'   , 'stan': false, 'required':true, 'type':'passwordMatch','DBrow':'' },
            {value: TimeConvert.CreateTime(),  'name':''   , 'stan': false, 'required':false, 'type':'','DBrow':'dateregister' },
            {value: $scope.regulation,  'name':'Nie Wybrano płci !'   , 'stan': false, 'required':true, 'type':'','DBrow':'' },
            {value: $scope.Sex,  'name':'Regulamin'   , 'stan': false, 'required':true, 'type':'sex','DBrow':'sex' }
    ];
    $scope.ErorrsRegister=[
                {value:  false ,'name':'EmptyData'},
                {value:  false ,'name':'passmath'},
                {value:  false ,'name':'passweek'},
                {value:  false ,'name':'emailNot'},
                {value:  false ,'name':'loginNot'},
                {value:  false ,'name':'regulation'},
                {value:  false ,'name':'autofServis'}
    ];
     $scope.RegisterKeyUp=[
                {'name':'login'    ,'HtmlElment':'.LoginRegister'},
                {'name':'email'    ,'HtmlElment':'.email'},
                {'name':'password' ,'HtmlElment':'.Password'},
    ];
    (function SetSex() {
        let GetSex=document.querySelectorAll('.SexElemnt');
        for(let Sex of GetSex){
            Sex.addEventListener('click',function(){
                Resset(GetSex)
                Sex.classList.add('ActiveSex');
                SexField=Array.FaindField($scope.RegisterForms,'sex','Type')
                $scope.Sex=Sex.getAttribute('data');
            })
        }
        function Resset(array){
            for(let Sex of GetSex){
                Sex.classList.remove('ActiveSex')
            }
        }
    })();
    var keyup=function keyup(item){
        
            var loginError=false;
            var EmailError=false;
            var PassStrongStan='';
            let itemkeyUp = document.querySelector(item.HtmlElment);
                    itemkeyUp.addEventListener('click',function(e){
                        let loginErrorClass = document.querySelector('.LoginError');
                        loginErrorClass.style.display='none'
                        let EmailErrorClass = document.querySelector('.EmailError');
                        EmailErrorClass.style.display='none'
                    })
                    itemkeyUp.addEventListener('blur',function(e){
                        item.validated=false;
                        item.goodvalidated=false;
                        if(this.value.length){
                            switch(item.name){
                                case 'password':
                                    let PassError = document.querySelector('.PassError');
                                    PassError.style.display='block'
                                    $scope.PassStrength=PassStrongStan
                                    var className='Password-'+PassStrong
                                    PassError.classList.add(className)
                                break;
                                case 'login':
                                    let loginErrorClass = document.querySelector('.LoginError');
                                    if(loginError){
                                        loginErrorClass.style.display='block'
                                        itemkeyUp.classList.add('inputError')
                                    }else{
                                        loginErrorClass.style.display='none'
                                        itemkeyUp.classList.add('inputSucces')
                                    }
                                break;
                                case 'email':
                                    let EmailErrorClass = document.querySelector('.EmailError');
                                    if(EmailError){
                                        EmailErrorClass.style.display='block'
                                        itemkeyUp.classList.add('inputError')
                                    }else{
                                        EmailErrorClass.style.display='none'
                                        itemkeyUp.classList.add('inputSucces')
                                    }
                                break;
                            }
                        }
                    })
                    itemkeyUp.addEventListener('keyup',function(){
                        $scope.ErorrsRegisterValidate=false;
                        loginError=false;
                        EmailError=false;
                            itemkeyUp.classList.remove('inputError')
                            itemkeyUp.classList.remove('inputSucces')
                            switch(item.name){
                                case 'login':
                                    if(this.value.length){
                                        itemkeyUp.classList.add('inputSucces')
                                        $http.get( '/LoginAvailable/'+this.value+'/').then( function( loging ){
                                            if(loging.data.length){
                                                itemkeyUp.classList.remove('inputSucces')
                                                itemkeyUp.classList.add('inputError')
                                                loginError=true;
                                            }
                                        });
                                    }                               
                                break;
                                case 'email':
                                    if(Forms.email(this.value)){
                                        itemkeyUp.classList.add('inputSucces')
                                    }else{
                                        EmailError=true;
                                        itemkeyUp.classList.add('inputError')
                                    }
                                break;
                                case 'password':
                                    if(this.value.length){
                                        let Passwords  = document.querySelectorAll('.passwordForm');
                                        let RepeatPass = document.querySelector('.Passwordpasswordrepeat');
                                        PassStrong=Forms.PasswordStrength(this.value);
                                        PassStrongStan=PassStrong
                                        var className='Password-'+PassStrong
                                        for (let Password of Passwords) {
                                            Password.classList.add('noborderhover')
                                            Password.classList.remove('Password-bad')
                                            Password.classList.remove('Password-week')
                                            Password.classList.remove('Password-good')
                                            Password.classList.remove('Password-strong')
                                            Password.classList.add(className)
                                        }
                                        RepeatPass.classList.add('PasswaordJoin')
                                    }
                                break;

                            }
                    })
        } 
    var RegisterRun = function(data){  
        $scope.RegisterForms=[
            {value:$scope.login,'name':'login','stan': false, 'required':true, 'type':'text','DBrow':'login' },
            {value: document.querySelector('.PasswordFormRegister').value,  'name':'Hasło'   , 'stan': false, 'required':true, 'type':'password','DBrow':'password' },
            {value: document.querySelector('.EmailRegister').value,  'name':'Email'   , 'stan': false, 'required':true, 'type':'email','DBrow':'email' },
            {value: document.querySelector('.Passwordpasswordrepeat').value,  'name':'Powtórz hasło'   , 'stan': false, 'required':true, 'type':'passwordMatch','DBrow':'' },
            {value: TimeConvert.CreateTime(),  'name':''   , 'stan': false, 'required':false, 'type':'','DBrow':'dateregister' },
            {value: $scope.regulation,  'name':'Nie zakceptowo Regulaminu'   , 'stan': false, 'required':true, 'type':'','DBrow':'' },
            {value: $scope.Sex,  'name':'Nie Wybrano płci !'   , 'stan': false, 'required':true, 'type':'sex','DBrow':'sex' }
        ];
        $scope.EmptyFieldsRegister=[];
        $scope.ErorrsRegisterValidate=false;
        $scope.ErorrsRegister=Register.Run($scope.RegisterForms,$scope.ErorrsRegister);      
        $scope.EmptyFieldsRegister=[];
        $scope.ErorrsRegister=Register.Run($scope.RegisterForms,$scope.ErorrsRegister);
        $scope.ErorrsRegisterValidate=Errors.Switch($scope.ErorrsRegister);
        $scope.EmptyFieldsRegister=Forms.EmptyFields($scope.RegisterForms);
        if(!$scope.ErorrsRegisterValidate){
            $http.get( '/LoginAvailable/'+$scope.login+'/').then( function( loging ){loging.data
                if(loging.data.length){
                    $scope.ErorrsRegister[4].value=true;
                    $scope.ErorrsRegisterValidate=Errors.Switch($scope.ErorrsRegister);
                }else{
                    $scope.ErorrsRegister[4].value=false;
                    $scope.ErorrsRegisterValidate=Errors.Switch($scope.ErorrsRegister);
                    $scope.RegisterForms=Forms.ConvertToSent($scope.RegisterForms)
                        $http.post('/register',$scope.RegisterForms).then( function( loging ){
                            Sesion.CreateSession(loging.data)
                            location.reload();
                        });       
                }
            });
        }   
    }
    keyup($scope.RegisterKeyUp[0]);
    keyup($scope.RegisterKeyUp[1]);
    keyup($scope.RegisterKeyUp[2]);
    let RegisterStart = document.querySelector('.RegisterStart');
    RegisterStart.addEventListener('click',function(){ 
        RegisterRun($scope.RegisterForms);
    })   
}]);
StartControlers.controller("MainController",['$scope','$http','Sesion','Socket','Messages','Notification','Componets','TimeConvert','$interval','$filter','Show','Chat','Mobile','Url','$timeout',function($scope,$http,Sesion,Socket,Messages,Notification,Componets,TimeConvert,$interval,$filter,Show,Chat,Mobile,Url,$timeout){
    if(Sesion.Tokken.login){
        $timeout(function(){ 
            Componets.Slids();
            MessagessFunction()
        },250)
        SetMobile()
        function SetMobile(){
            $timeout(function(){ 
                if(Mobile.IfMobile(1024)){
                   Data={
                       DataItem:"data-Slide-id"
                   }
                   Mobile.Reset(Data);
                }else{
                    Data={
                       DataItem:"Show-Hiden-Slide"

                   }
                   Mobile.Reset(Data);
                }
            },250)
            if(Mobile.IfMobile(768)){
                $scope.loginLenght={
                    "normal":12,
                    "MoreThenZero":9,
                    "NotActiveNormal":12,
                    "ActiveMoreThenZero":9,
                }
            }else{
                $scope.loginLenght={
                    "normal":17,
                    "MoreThenZero":15,
                    "NotActiveNormal":17,
                    "ActiveMoreThenZero":15,
                }
            }
        }
        Componets.loadMainCompnent();
        $scope.user=Sesion.Tokken; 
        $scope.ActiveChat=Chat.GetActiveChat();
        $scope.I=0
        var MessagessFunction = function (){
            let MarkasReededSelectors = document.querySelectorAll('.Reeded');
            for(let Button of MarkasReededSelectors){
                Button.addEventListener('click',function(e){
                    MarkasReeded()
                })
            }
                
                
            let ClearAllMessagesSelector = document.querySelector('.TrassClear');
            ClearAllMessagesSelector.addEventListener('click',function(e){
                ClearAllMessages();
            })
            var MarkasReeded = function(){    
                $scope.ChatList=Chat.SetReededChat($scope.ChatList)
                Socket.emit('MarkAsReeded',$scope.user)
            }
            var ClearAllMessages =function(){
                $timeout(function () {
                    $scope.messages=Messages.ClearMessages();  
                }, 1);
                $scope.counts.NotreededMes=0;
            }
        }
        var ActiveChatMenu= function(){
            CloseActiveChats=document.querySelectorAll('.CloseActiveChat');
            for (let Close of CloseActiveChats) {
                Close.addEventListener('click',function(event){
                    $timeout(function () {
                        index=Close.getAttribute('chat-data-close')
                        $scope.ActiveChat.splice(index,1)
                        Chat.AddToStore($scope.ActiveChat)
                    }, 1);
                })
            }
            Componets.Model();
            AddToChat=document.querySelector('.AddToChat');
            AddToChat.addEventListener('click',function(event){
                index=AddToChat.getAttribute('chat-data-index')
                AddtoChat=document.querySelectorAll('.InputAddUserToChat');
                for (let Add of AddtoChat) {
                    NewValue= JSON.parse(Add.value);
                    if(Chat.UserInchat(NewValue.UserID,$scope.ActiveChat[index].inChat)){
                        Add.checked=true;
                    }
                } 
            })
            Accept=document.querySelector('.Accept');
            Accept.addEventListener('click',function(event){
                AddtoChat=document.querySelectorAll('.InputAddUserToChat');
                NewInchat=[];
                NewInchat.push($scope.user)
                for (let Add of AddtoChat) {
                    if(Add.checked){
                        NewValue= JSON.parse(Add.value);
                        NewInchat.push(NewValue)
                    }
                }
                $timeout(function(){
                    NewInchat=Chat.ResetIdConversation(NewInchat)
                    SetUserChat(index,Chat.BlindMultiChat(NewInchat),false,NewInchat)
                },5);
            })
        }
        var EnterSend=function(){
            EnterSendSelectors=document.querySelectorAll('.EnterSend')
            var tipping=false;
            for (let Enter of EnterSendSelectors) { 
                Enter.addEventListener('keydown',function(event){
                    id=Enter.getAttribute('chat-data-id')
                    FoundIndex=Chat.ActiveChat(id,$scope.ActiveChat)
                    tipping=true;
                    DataTypping={
                        ConversationID:id,
                        SesionData:$scope.user,
                        UsersInChat:$scope.ActiveChat[FoundIndex].inChat
                    }
                    Socket.emit('SomeoneTypping',DataTypping)
                    if(event.keyCode=='13'){
                        if(Enter.value != ''){
                            DataSent={
                                "ConversationidMesages":id,
                                "content":Enter.value,
                                "IdSend":$scope.user.UserID,
                                "time":TimeConvert.CreateTime(),
                                "UsersInChat":$scope.ActiveChat[FoundIndex].inChat,
                            }
                            Enter.value='';
                            Socket.emit('InsertMessage',DataSent,$scope.user)
                            Socket.emit('StopTypping',DataTypping)
                        }
                    }
                    var myVar=setTimeout(function(){ 
                        tipping=false;
                    },500)
                })
                Enter.addEventListener('click',function(event){
                    id=Enter.getAttribute('chat-data-id')
                    FoundIndex=Chat.ActiveChat(id,$scope.ActiveChat)
                    if(!$scope.ActiveChat[FoundIndex].ShowAllReeded){
                        $scope.ChatList=Chat.SetReededChat($scope.ChatList)
                        Socket.emit('MarkAsReeded',$scope.user,id)
                    }
                })
                Enter.addEventListener('keyup',function(event){
                    id=Enter.getAttribute('chat-data-id')
                    FoundIndex=Chat.ActiveChat(id,$scope.ActiveChat)
                    DataTypping={
                        ConversationID:id,
                        SesionData:$scope.user,
                        UsersInChat:$scope.ActiveChat[FoundIndex].inChat
                    }
      
                    var myVar=setTimeout(function(){
                        if(tipping==false){
                            Socket.emit('StopTypping',DataTypping)
                        }
                    },1000)
                    

                })
            }
        }
        if($scope.ActiveChat.length){
            $timeout(function(){ 
                $scope.ActiveChatItem=Chat.SetActiveChatItem($scope.ActiveChat)
                setTimeout(function(){ 
                    Chat.ScrolDown();
                }, 500);
                ActiveChatMenu()
                EnterSend()
            }, 200);
        }
        $scope.PressTime=0;
        $scope.writeTimeout=2;
        $scope.NevMes=[]
        $scope.show={
            'MessMobileVersion':Mobile.IfMobile(768)
        }
        $scope.counts={
            'UserOnline'  :0,
            'AllMessages' :0,
            'NotreededMes':0,
            'NotreededNot':0
        }
        $scope.SearchBattuns={
            'SearchDiv':false
        }
        MessagesSocket();
        NotificationSocket();
        ChatSocket();
        $scope.AddNewUserToChat=function(index,value){
            $scope.ActiveChat[index].UserInChat=false;
        }
        $scope.someoneTypping = function($index){
            var stan=[{
                "ActiveChat":$scope.ActiveChat[$index],
                "SesionData":$scope.user
            }]
            Socket.emit('SomeoneTypping',stan)
        }
        $scope.StopTypping=function($index){
            var stan=[{
                "ActiveChat":$scope.ActiveChat[$index],
                "SesionData":$scope.user
            }]
            Socket.emit('StopTypping',stan)
        }
        function MessagesSocket(){
            Socket.emit('request-messages',$scope.user)
            Socket.on('messages',function(data){
                loadMessages(data)
            })
            Socket.on('MarkAsReeded',function(){
                Socket.emit('request-messages',$scope.user)
                $scope.ActiveChat=Chat.SetActiveChat($scope.ActiveChat)
                Chat.AddToStore($scope.ActiveChat)
            })
            Socket.on('AddMessages',function(data){
                Socket.emit('request-messages',$scope.user)
                if(Chat.ChatShow(data[0].UsersInConversationJason)){
                    FoundIndex=Chat.ActiveChat(data[0].ConversationidMesages,$scope.ActiveChat)
                    if(FoundIndex!=undefined){
                        $scope.ActiveChat[FoundIndex].SetAllMessReeded=false;
                        UsersInChat=$scope.ActiveChat[FoundIndex].Messages.push(data[0])
                        setTimeout(function(){
                            Chat.ScrolDown($scope.ActiveChat[FoundIndex].IdConversation);
                        }, 50);
                        setTimeout(function(){ 
                            lastMess=$scope.ActiveChat[FoundIndex].Messages[$scope.ActiveChat[FoundIndex].Messages.length-1]
                            $scope.ActiveChat[FoundIndex].ShowAllReeded=Chat.ShowAllReeded($scope.ActiveChat[FoundIndex],lastMess);
                            Chat.AddToStore($scope.ActiveChat)
                        }, 50);
                    }else{
                        if(Mobile.IfMobile(768)){
                            data=Messages.CreatePrevievMes($scope.messages)
                            if(data.IdSend!=$scope.user.UserID){
                                $scope.NevMes.push(data)
                                ScrolData($scope.NevMes)                  
                            }
                        }else{
                            setTimeout(function(){
                             $scope.NotReededList=Chat.UpdataToMobileNotReededList($scope.ChatList)
                            }, 100);
                        }
                    }
                }
                /*
                if(Show.ShowMe(data.Mess)){
                    Faind=Chat.FaindUserInActiveChatRes($scope.ActiveChat,data.Mess);
                    $scope.messagesNormal=Messages.Add(data.Mess,$scope.messagesNormal)
                    loadMessages($scope.messagesNormal)
                    $scope.ChatList=Chat.Set($scope.ChatList,$scope.messages.AllMessages);
                    if(Faind==undefined){
                        data.Mess=Messages.CreatePrevievMes($scope.messages)
                        if(data.sendID!=$scope.user.UserID){
                            $scope.NevMes.push(data)
                            ScrolData($scope.NevMes)                  
                        }
                    }else{  
    
                        scroll=document.querySelector('.messages-section')
                        data=Chat.SetMessages(data.Mess)
                        $scope.ActiveChat[Faind].Messages.push(data[0])
                        $scope.ActiveChat[Faind].LastMess=Chat.LetestMess($scope.ActiveChat[Faind].Messages)
                        $scope.ActiveChat[Faind].SomeoneWriting=false;
                        scroll.scrollTop=scroll.scrollHeight+50;
                    }
                } 
                */
            })
        }
        function loadMessages(data){
            $scope.messages=Messages.Prepare(data.FirstResult,data.SecundResult);
            $scope.counts.NotreededMes=Messages.CountMess($scope.messages)
            
            //$scope.messages=Messages.CountMultiChat($scope.messages,data.SecundResult)
            
            /*
                $scope.messages=Messages.CountMultiChat($scope.messages,data.SecundResult)
                $scope.counts.NotreededMes=Messages.CountMess($scope.messages)
            Messages.SetCountFromUser(data.SecundResult,$scope.messages);
            Messages.SetNotReedFromUser(data.SecundResult,$scope.messages)
             
            angular.forEach($scope.messages, function (array, key) {
                    
                            
                               /* CountNotMessFomUser=Url.GetData('/CountNotMessFomUser/'+$scope.messages[key].SqlID+'/'+$scope.user.UserID+'/'+$scope.messages[key].IdConversation)
                                if(CountNotReededMess){
                                    clearInterval(CountNotMessFomUserinterval);
                                    CountNotMessFomUserinterval=undefined; 
                                    $scope.messages[key].CountNotMessFomUser=CountNotMessFomUser[0].resultsql
                                }
                                */

                            /*
                            clearInterval(interval);
                            console.log(CountNotReededMess[0].CountReeded)
                            interval=undefined; 
                            $timeout(function(){ 
                                
                                $scope.messages[key].countNotReeded=CountNotReededMess[0].CountReeded
                            }, 100);
                            /*
                            $scope.messages[key].countNotReeded=CountNotReededMess[0].CountReeded
                            console.log($scope.messages[key].countNotReeded)
                            /*
                            interval=setInterval(function(){
                               CountNotMessFomUser=Url.GetData('/CountNotMessFomUser/'+$scope.messages[key].SqlID+'/'+$scope.user.UserID+'/'+$scope.messages[key].IdConversation)
                                clearInterval(interval);
                                interval=undefined; 
                                if(CountNotReededMess){
                                    $scope.messages[key].CountNotMessFomUser=CountNotMessFomUser[0].resultsql
                                }
                        
                            },25);
                    
                        }
                    },25);
                 
            })
            */
        }
        function NotificationSocket(){
            Socket.emit('request-Notification',$scope.user)
            Socket.on('notification',function(data){
                $scope.notifications=Notification.SetNotification(data)
                $scope.counts.NotreededNot=Notification.countNotReeded($scope.notifications);
            })
            Socket.on('NotificationMarkAssRecived',function(data){
                data=Notification.SetNotification(data)
                $scope.notifications=data;
            })
            Socket.on('NotificationAdd',function(data){
                if(Show.ShowMe(data)){
                    data=Notification.SetNotificationRecived(data,$scope.notifications)
                    $scope.notifications=Notification.SetNotification(data)
                    $scope.counts.NotreededNot=Notification.countNotReeded($scope.notifications);
                }
            })
        }
        function ChatSocket(){
            Socket.emit('request-chat',$scope.user)
            Socket.on('SomeoneTypping',function(data){
                FoundIndex=Chat.ActiveChat(data.ConversationID,$scope.ActiveChat)
                if(FoundIndex!=undefined && data.SesionData.UserID!=$scope.user.UserID){
                    $scope.ActiveChat[FoundIndex].SomeoneWriting=true;
                    $scope.ActiveChat[FoundIndex].TyppingPerson=data.SesionData
                    myVar =setTimeout(function(){
                        Chat.ScrolDown(data.ConversationID);
                    }, 100);
                }
            })
            Socket.on('StopTypping',function(data){
                FoundIndex=Chat.ActiveChat(data.ConversationID,$scope.ActiveChat)
                if(FoundIndex!=undefined && data.SesionData.UserID!=$scope.user.UserID){
                   $scope.ActiveChat[FoundIndex].SomeoneWriting=false;
                   $scope.ActiveChat[FoundIndex].TyppingPerson=data.SesionData
                }

            })
            Socket.on('load-chat',function(data){
                loadChat(data)
            }) 
            ChatDiv=document.querySelector('body');
            window.onblur= function(){
                Socket.emit('request-chat',$scope.user)
            };
            window.onbeforeunload = function () {
                Socket.emit('RemuerFromChat',$scope.user,TimeConvert.CreateTime())
            };
        }
        function loadChat(data){
            $scope.ChatList=Chat.Set(data,$scope.messages)
            $scope.NotReededList=Chat.UpdataToMobileNotReededList($scope.ChatList)
            $scope.counts.UserOnline=Chat.CountOnline($scope.ChatList)
            if($scope.ActiveChat.length){
                $scope.ChatList=Chat.UpadataConversationChats($scope.ActiveChat,$scope.ChatList)
            }
            $timeout(function(){ 
                CreateNewChat=document.querySelectorAll('.CreateNewChat')
                for (let Create of CreateNewChat) {
                    Create.addEventListener('click', function(e){
                        e.preventDefault();
                        AddUser=Create.getAttribute('DataChat');
                        AddUserToChat=false;
                        if(AddUser){
                            AddUser=JSON.parse(AddUser)
                            AddUserToChat=true;
                        }
                        $timeout(function(){ 
                            if(AddUserToChat){
                                    if(AddUser.length==undefined){
                                        if(Chat.ChatNotActive(AddUser.IdConversation)){
                                            index=$scope.ActiveChat.push(Chat.Create(AddUser))
                                            index=index-1;
                                            SetUserChat(index,AddUser.UserID,false,AddUser)
                                        }
                                    }else{
                                        if(Chat.ChatNotActive(AddUser[1].IdConversation)){
                                            index=$scope.ActiveChat.push(Chat.Create(AddUser))
                                            index=index-1;
                                            SetUserChat(index,Chat.BlindMultiChat(AddUser),false,AddUser)
                                        }
                                    }
                            }else{
                                index=$scope.ActiveChat.push(Chat.Create(AddUserToChat))
                                index=index-1;
                                SetChat(index,false)
                            }
                        }, 1);

                    })
                }
            }, 1);
            var SetChat = function(index,mobile){
                if(!mobile){
                    $scope.ActiveChat[index].loadingMessages=false
                    setTimeout(function(){
                        SelectUserToChat(index)
                    },1);
                }
                
            }
            var SelectUserToChat=function(index){
                SelectUser=document.querySelectorAll('.SelectToChat');
                for (let Select of SelectUser) {
                    Select.addEventListener('change',function(event){
                        SetUserChat(index,this.value,false,[])
                    })
                }
            }
        }
        function ScrolData(data){
            DivHeight=document.querySelector('.NewMesPrevievDiv')
            document.querySelector('.NewMesPreviev-JS').classList.remove('NewMesPreviev-Opacity')
            Rows=Math.round(data[0].Content.length/28)
            Actual=DivHeight.style.height=60;
            PlusValue=Rows*20;
            NewHeight=Actual+PlusValue;
            if(data[0].Content.length>28){
                if(NewHeight>200){
                    DivHeight.style.height=200;
                    var start=-10;
                    DivHeight.style.transform="translateY(-10%)";
                    var Time=0;
                    var limit=1000
                    Intval=setInterval(function(){  
                        Time=Time+100;
                        DivHeight.style.transform="translateY("+start+"%)";
                        start=start+-10
                        if(Time>limit-300){
                            clearInterval(Intval)
                            DivHeight=document.querySelector('.NewMesPreviev-JS').classList.add('NewMesPreviev-Opacity')
                            $scope.NevMes=[];
                        }
                    },500);
                    
                }else{
                    DivHeight.style.height=NewHeight;
                    DivHeight.style.transform="translateY(-5%)";
                    myVar =setTimeout(function(){
                    clearTimeout(myVar)
                    document.querySelector('.NewMesPreviev-JS').classList.add('NewMesPreviev-Opacity')
                      $scope.NevMes=[];
                   },2000);
                }
                
            }else{
                myVar =setTimeout(function(){
                    clearTimeout(myVar)
                    document.querySelector('.NewMesPreviev-JS').classList.add('NewMesPreviev-Opacity')
                    $scope.NevMes=[];
                },2000);    
            }
        }
        var SetID= function(index,AddTo){
            console.log($scope.ActiveChat[index].inChat)
                Exist=setInterval(function(){
                    Request=Url.Post('/IFConversationExist',$scope.ActiveChat[index].inChat)
                    if(Request=='Create'){
                        clearInterval(Exist);
                        Exist=undefined;
                        Url.GetDataNoReturnPost('/CreateConversation',$scope.ActiveChat[index].inChat)
                        GetID(false,index,AddTo)
                    }else if(Request.Stan=='GetID'){
                        clearInterval(Exist);
                        Exist=undefined;
                        GetID(Request.ID,index,AddTo)
                    }
                },250)
            function GetID(id,index,AddTo){
                if(id){
                    console.log(id)
                    $scope.ActiveChat[index].IdConversation=id
                    $scope.ChatList=Chat.UpadataConversationChat($scope.ChatList,AddTo,id)
                    GetMessages(index) 
                }else{
                    CreateID=setInterval(function(){
                        Request=Url.Post('/IFConversationExist',$scope.ActiveChat[index].inChat)
                        if(Request.Stan=='GetID'){
                            clearInterval(CreateID);
                            CreateID=undefined;
                            $scope.ActiveChat[index].IdConversation=Request.ID
                            $scope.ChatList=Chat.UpadataConversationChat($scope.ChatList,AddTo,Request.ID)
                            console.log($scope.ActiveChat[index].IdConversation)
                            GetMessages(index)
                        }
                    },250)
                }
            }
            /*
                 if(AddTo.length==undefined){
                     console.log($scope.ActiveChat[index].inChat)
                     $scope.ChatList=Chat.UpadataConversationChat($scope.ChatList,AddTo,-1)
                        interval=setInterval(function(){
                            Request=Url.Post('/CreateConversation',$scope.ActiveChat[index].inChat)

                            if(Chat.ChatNotActive(Request.heder)){
                                if(Request.heder>0){
                                    clearInterval(interval);
                                    interval=undefined;
                                    $scope.ActiveChat[index].IdConversation=Request.heder
                                    $scope.ChatList=Chat.UpadataConversationChat($scope.ChatList,AddTo,Request.heder)
                                    GetMessages(index) 
                                }
                            }
        
                    },250)
                 }else{
                    
                     interval=setInterval(function(){
                         Request=Url.Post('/CreateConversation',$scope.ActiveChat[index].inChat)
                         if(Chat.ChatNotActive(Request.heder)){
                             clearInterval(interval);
                             interval=undefined;
                             $scope.ActiveChat[index].IdConversation=Request.heder
                             $scope.ChatList=Chat.UpadataConversationChat($scope.ChatList,AddTo,Request.heder)
                             GetMessages(index) 
                         }
                     },250)
                     
                 }
                 */
        }
        var SetUserChat=function(index,value,Mobile,Multi){ //index,value
                if(!Mobile){
                    if(Multi.length==undefined || Multi.length==0 || Multi.length==1){
                        AddTo=Chat.AddUser(value,$scope.ChatList)
                        $scope.ActiveChat[index].inChat.push(AddTo);
                        $scope.ActiveChat[index].SendData=Chat.SetSendData($scope.ActiveChat[index].inChat)
                        $scope.ActiveChat[index].Chused=true;
                        if(!AddTo.IdConversation){
                            SetID(index,AddTo)
                        }else{
                        
                            $scope.ActiveChat[index].IdConversation=AddTo.IdConversation
                                $scope.ActiveChat[index].Active=true;
                            $scope.ActiveChat=Chat.SetActiveChatMobile($scope.ActiveChat[index].IdConversation,$scope.ActiveChat)
                            $scope.ActiveChatItem=Chat.SetActiveChatItem($scope.ActiveChat)
                            GetMessages(index) 
                        }
                    }else{
                       $scope.ActiveChat[index].inChat=Multi;
                       $scope.ActiveChat[index].Chused=true;
                       if(Multi[1].IdConversation){
                           $scope.ActiveChat[index].IdConversation=Multi[1].IdConversation
                             $scope.ActiveChat[index].Active=true;
                            $scope.ActiveChat=Chat.SetActiveChatMobile($scope.ActiveChat[index].IdConversation,$scope.ActiveChat)
                            $scope.ActiveChatItem=Chat.SetActiveChatItem($scope.ActiveChat)
                           GetMessages(index)
                       }else{
                           SetID(index,Multi)
                       }
                    }

                    
                }
        }
        var GetMessages  =function(index){
                    GetMesagesLoop=undefined;
                    LoadMeesaes=setInterval(function(){
                        GetMesagesLoop=Url.GetData('/LoadConversation/'+$scope.ActiveChat[index].IdConversation)
                        if(GetMesagesLoop.id==$scope.ActiveChat[index].IdConversation){
                            clearInterval(LoadMeesaes);
                            LoadMeesaes=undefined; 
                            $scope.ActiveChat[index].Messages=GetMesagesLoop.result
                            setTimeout(function(){
                                Chat.ScrolDown($scope.ActiveChat[index].IdConversation);
                            }, 50);
                            $scope.ActiveChat[index].loadingMessages=false;
                            Chat.AddToStore($scope.ActiveChat)
                            ActiveChatMenu()
                            EnterSend()
                            $scope.ActiveChat[index].ShowAllReeded=Chat.ShowAllReeded($scope.ActiveChat[index]);
                            $scope.ActiveChat[index].SetAllMessReeded=Chat.SetAllMessReeded($scope.ActiveChat[index]);
                        }
                    },250);
               
        }
        $scope.ClearNotifications=function(){
            $scope.notifications=Notification.ClearAllNotification();
        }
        $scope.MarkAssReed=function($index){
          chat=Chat.MarkAssReededChat($scope.ActiveChat[$index].Messages,$scope.messages.AllMessages)
          Socket.emit('MarkAsReeded',chat,$scope.user)
           data={
              Session:$scope.user,
              ActiveChat:$scope.ActiveChat[$index]
           }
            if($scope.ActiveChat[$index].LastMess.sendID!=$scope.user.UserID){
                Socket.emit('MarkAsReededChat',data);  
            }
        }
    }else{
        window.location.assign("#!/start")
    }
}]);
StartControlers.controller("MainNavbarController",['$scope','$http','Sesion','Socket','Messages','Notification','Componets','TimeConvert','$interval',function($scope,$http,Sesion,Socket,Messages,Notification,Componets,TimeConvert,$interval){
    let Search = document.querySelector('.Main-Search');
    Search.addEventListener('keyup',function(e){
            SearchFunction(this.value)
    }) 
    LoadSection(0)
    LoadSection(1)
    LoadSection(2)
    function SearchFunction(value){
            let SearchDiv = document.querySelector('.SearchDiv');
        if(value.length>0){
            $(SearchDiv).slideDown( "slow");
        }else{
            $(SearchDiv).slideUp( "slow");
        }
    } 
    function LoadSection(Elemnt){
            $scope.ActiveElments=[
                {"Click":'.Load-Notification-Click',"Active":'.MainMenuItem.Notification',"ActivSection":'.Load-Notification',"SectionName":'.Load-Section-notifications',"Url":'Notification'},
                {"Click":'.Load-Messages-Click',"Active":'.MainMenuItem.Messages',"ActivSection":'.Load-Messages',"SectionName":'.Load-Section-messages',"Url":'messages'},
                {"Click":'.Load-Drapdown-Click',"Active":'.MainMenuItem.Drapdown',"ActivSection":'.Load-Drapdown',"SectionName":'.Load-Section-Drapdown',"Url":'menu'}
            ]    
            let LoadSection = document.querySelector($scope.ActiveElments[Elemnt].Click);
                LoadSection.addEventListener('click',function(e){
                        e.preventDefault();
                        $scope.ActiveElments=ResetActiveElents($scope.ActiveElments);
                        let ActiveItem = document.querySelector($scope.ActiveElments[Elemnt].Active);
                        let ActivSectionItem = document.querySelector($scope.ActiveElments[Elemnt].ActivSection);
                        let SectionName= document.querySelector($scope.ActiveElments[Elemnt].SectionName);
                        let LoadSection= document.querySelector('.Load-div')
                        if($scope.Elment==undefined | $scope.Elment!=Element ){
                            $(SectionName).slideDown( "slow");
                            ActiveItem.classList.add('clicked-button')
                            ActivSectionItem.classList.add('ActivSection','btn-radius-top')
                            $(LoadSection).slideDown( "slow");
                        }else if($scope.Elment===Element){
                            $(SectionName).slideUp( "slow");
                            ActiveItem.classList.remove('clicked-button')
                            ActivSectionItem.classList.remove('ActivSection','btn-radius-top')
                            $(LoadSection).slideUp( "slow");
                            $scope.Elment=undefined;
                            return false;
                        }
                        $scope.Elment=Element;
                    
                })
                function ResetActiveElents(array){
                    for (i = 0; i < array.length; i++) { 
                       ActivSectionItem = document.querySelector(array[i].ActivSection);
                       ActiveItem = document.querySelector(array[i].Active);
                       SectionName= document.querySelector(array[i].SectionName);
                       SectionName.style.display='none';
                       ActiveItem.classList.remove('clicked-button')
                       ActivSectionItem.classList.remove('ActivSection','btn-radius-top')
                    }
                    return array;
                } 
        }
    let logoNav = document.querySelector('.logoNav');
    logoNav.addEventListener('click',function(){
        window.location.assign("#!/")
    })
}]);
StartControlers.controller("MessagesController",['$scope','$http','Sesion','Socket','Messages','Componets','TimeConvert','$interval','$timeout','Chat','Url',function($scope,$http,Sesion,Socket,Messages,Componets,TimeConvert,$interval,$timeout,Chat,Url){
    /*
    var MarkasReeded = function(){    
        $scope.ChatList=Chat.SetReededChat($scope.ChatList)
        Socket.emit('MarkAsReeded',$scope.user)
        console.log('fewf')
    }
    var ClearAllMessages =function(){
        $timeout(function () {
            $scope.messages=Messages.ClearMessages();  
        }, 1);
        $scope.counts.NotreededMes=0;
    }
    $timeout(function () {
        let MarkasReededSelector = document.querySelector('.Reeded');
        MarkasReededSelector.addEventListener('click',function(e){
            MarkasReeded()
        })
        let ClearAllMessagesSelector = document.querySelector('.TrassClear');
        ClearAllMessagesSelector.addEventListener('click',function(e){
            ClearAllMessages();
        })
    }, 500);
    */
    /*
    let SentSelector = document.querySelector('.sent');
    SentSelector.addEventListener('click',function(e){
        Chat.Create()
       // sent();
    })
    */
    /*
    var sent = function(){
        content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam maiores ad odio, temporibus quo dolore nobis pariatur blanditiis nam eos maxime ratione at. A ratione magnam, voluptate, autem distinctio quia.';
        address=[{"id":$scope.user.UserID},{"id":2}]
        membersMormal=$scope.user.UserID+' 2'
        memberINsttring=JSON.stringify(address);
        DataSent={
            "address":memberINsttring,
            "content":content,
            "sendID":$scope.user.UserID,
            "time":TimeConvert.CreateTime(),
            "MemberInCoversationnormal":membersMormal    
        }
        Socket.emit('InsertMessage',DataSent,$scope.user)
    }
    */
    
}]);
StartControlers.controller("NotificationController",['$scope','$http','Sesion','Socket','Messages','Notification','Componets','TimeConvert','$interval',function($scope,$http,Sesion,Socket,Messages,Notification,Componets,TimeConvert,$interval){
    var Reeded = function(){
        $scope.notifications=Notification.SignAsReed($scope.notifications)
        $scope.counts.NotreededNot=0;
    }
    var ClearAllNotifications =function(){
        $scope.ClearNotifications()
    }
    let reededSelector = document.querySelector('.ReededNotfocation');
    let ClearSelector = document.querySelector('.DeleteAllNotification');
    let DebugSent = document.querySelector('.DebugSent');
    reededSelector.addEventListener('click',function(e){
        Reeded()
    })
    ClearSelector.addEventListener('click',function(e){
        ClearAllNotifications();
        $scope.counts.NotreededNot=0;
    })
    DebugSent.addEventListener('click',function(e){
        content=[$scope.user];
        data ={
            "deliver":2,
            "date":TimeConvert.CreateTime(),
            "content":JSON.stringify(content),
            "type":'UserLike',
            "reeded":0
        }
        Socket.emit('NotificationInsert',data,$scope.user)
    })

}]);
StartControlers.controller("loguat",['$scope','$http','Sesion','Socket','TimeConvert','$interval',function($scope,$http,Sesion,Socket,TimeConvert,$interval){
    if(Sesion.Tokken.login){
        $scope.user=Sesion.Tokken; 
        console.log(TimeConvert.CreateTime())
        Socket.emit('RemuerFromChat',$scope.user,TimeConvert.CreateTime())
        Sesion.Logout();
        location.reload()
    }else{
       window.location.assign("#!/start") 
    }
}]);
StartControlers.controller("MainPageController",['$scope','$http','Sesion','Socket','Messages','Notification','Componets','TimeConvert','$interval','$filter','Show',function($scope,$http,Sesion,Socket,Messages,Notification,Componets,TimeConvert,$interval,$filter,Show){
    Componets.loadMainCompnent();
}]);
