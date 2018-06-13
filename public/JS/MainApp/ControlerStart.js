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
StartControlers.controller("MainController",['$scope','$http','Sesion','Socket','Messages','Notification','Componets','TimeConvert','$interval','$filter','Show','Chat','Mobile',function($scope,$http,Sesion,Socket,Messages,Notification,Componets,TimeConvert,$interval,$filter,Show,Chat,Mobile){
    if(Sesion.Tokken.login){
        $scope.mobile=Mobile.IfMobile
        Componets.loadMainCompnent();
        $scope.user=Sesion.Tokken; 
        $scope.ActiveChat=[]
        $scope.PressTime=0;
        $scope.writeTimeout=2;
        $scope.NevMes=[]
        $scope.show={
            'MessMobileCount':false
        }
        $scope.counts={
            'UserOnline'  :0,
            'AllMessages' :0,
            'NotreededMes':0,
            'NotreededNot':0
        }
        $scope.SearchBattuns={
            'SearchDiv':false,
            'NotreededNot':1
        }
        $scope.GetData=function(url){
            stop = $interval(function() {
                ValueToReturn=undefined;
                $http.get(url).then( function( Get ){
                    $scope.Get=Get.data
                });
                if($scope.Get!=undefined){
                    $interval.cancel(stop);
                    stop = undefined;
                    ValueToReturn=$scope.Get;
                }
            }, 1);
            return ValueToReturn
        }
        MessagesSocket();
        NotificationSocket();
        ChatSocket();
        $scope.ShowAdd=function(index){
            $scope.ActiveChat[index].AddIconShow=true;
        }
        $scope.ShowHide=function(index){
            $scope.ActiveChat[index].AddIconShow=false;
        }
        $scope.AddNewUserToChat=function(index,value){
            $scope.ActiveChat[index].UserInChat=false;
        }
        $scope.SetUserChat=function(index,value){
                $scope.ActiveChat[index].Chused=true;
                AddTo=Chat.AddUser(value,$scope.ChatList)
                $scope.ActiveChat[index].inChat.push(AddTo);
                var SentData={
                    "sesion":$scope.user,
                    "inchat":$scope.ActiveChat[index].inChat
                }
                $http.post('/loadActiveChat',SentData).then( function( Get ){
                    scroll=document.querySelector('.messages-section') 
                    $scope.ActiveChat[index].Messages=Chat.SetMessages(Get.data)
                    $scope.ActiveChat[index].LastMess=Chat.LetestMess($scope.ActiveChat[index].Messages)
                    setTimeout(function(){
                        scroll.scrollTop=scroll.scrollHeight+50;
                    },1);
                    function SetMessages(data){
                        Chat.PrepearMessages(data)
                    }
                });
                let EnterSend=document.querySelectorAll('.EnterSend');
                setTimeout(function(){ 
                       let EnterSend=document.querySelectorAll('.EnterSend');              
                        for (let Enter of EnterSend) {
                            if(Enter){
                                Enter.addEventListener('keydown',function(event){
                                        if(event.keyCode=='13'){
                                            if(Enter.value != ''){
                                                scroll=document.querySelector('.messages-section')
                                                scroll.scrollTop=scroll.scrollHeight+50; 
                                                address=$scope.ActiveChat[index].inChat
                                                memberINsttring=JSON.stringify(address);
                                              $scope.ActiveChat[index].inChat=Chat.RemuweReeded($scope.ActiveChat[index].inChat)
                                                DataSent={
                                                    "address":memberINsttring,
                                                    "content":Enter.value,
                                                    "sendID":$scope.user.UserID,
                                                    "time":TimeConvert.CreateTime(),
                                                }
                                                setTimeout(function(){
                                                    scroll.scrollTop=scroll.scrollHeight+50;
                                                }, 50);
                                                Enter.value='';
                                                Socket.emit('InsertMessage',DataSent,$scope.user)
                                            }
                                        }
                                });
                            }
                        }
                }, 300);
                setTimeout(function(){
                   data={
                       Chat:$scope.ActiveChat[index].Messages,
                       Value:value,
                       InChat:$scope.ActiveChat[index].inChat,
                       All:$scope.messages.AllMessages
                   } 
                   $scope.messages.AllMessages=Chat.AddresReeded(data)
               },5);
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
            Socket.on('MarkAsReeded',function(data){
                $scope.messagesNormal=Messages.MarksAssReedRecived(data,$scope.messagesNormal)
                loadMessages($scope.messagesNormal)
                $scope.ChatList=Chat.Set($scope.ChatList,$scope.messages.AllMessages);
            })
            
            Socket.on('AddMessages',function(data){
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
            })
        }
        function loadMessages(data){
                messagess=[]
                $scope.messagesNormal=data;
                $scope.counts.NotreededMes=Messages.countNotReeded($scope.messagesNormal);
                if($scope.counts.NotreededMes>0){
                    $scope.show.MessMobileCount=true;
                }
                messagess=Messages.Prepear($scope.messagesNormal,messagess)
                $scope.messages={
                    'NormalMessages':messagess,
                    'AllMessages'   :$scope.messagesNormal
                }
                $scope.counts.AllMessages=Messages.CountAllMessages($scope.messages);
                $scope.messages=Messages.SetMessages($scope.messages,35);
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
            Socket.on('MarkAsReededChat',function(data){
                key=Chat.FaindUserInActiveChat($scope.ActiveChat,data.ActiveChat)
                if($scope.ActiveChat[key]){
                    $scope.ActiveChat[key].inChat=data.ActiveChat.inChat
                    Intval=setTimeout(function(){ 
                        scroll=document.querySelector('.messages-section') 
                        scroll.scrollTop=scroll.scrollHeight+50;
                    },1)
                }
                
            })
            Socket.on('SomeoneTypping',function(data){
                    if(data[0].SesionData.UserID!=$scope.user.UserID){
                        key=Chat.FaindUserInActiveChat($scope.ActiveChat,data[0].ActiveChat)
                        if($scope.ActiveChat[key]){
                            scroll=document.querySelector('.messages-section') 
                            $scope.ActiveChat[key].TyppingPerson=data[0].SesionData
                            $scope.ActiveChat[key].SomeoneWriting=true;
                            scroll.scrollTop=scroll.scrollHeight+50;   
                        }
                    }
            })
            Socket.on('StopTypping',function(data){
                
                    if(data[0].SesionData.UserID!=$scope.user.UserID){
                        key=Chat.FaindUserInActiveChat($scope.ActiveChat,data[0].ActiveChat)
                        if($scope.ActiveChat[key]){
                            $scope.ActiveChat[key].TyppingPerson=data[0].SesionData
                            scroll=document.querySelector('.messages-section') 
                            scroll.scrollTop=scroll.scrollHeight+50; 
                            Intval=setTimeout(function(){ 
                                $scope.ActiveChat[key].SomeoneWriting=false;
                            },100); 
                        }
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
            $scope.ChatList=Chat.Set(data,$scope.messages.AllMessages);
            $scope.NotReededList=Messages.SetMobileNotReddedList($scope.ChatList)
            $scope.counts.UserOnline=Chat.CountOnline($scope.ChatList)
        }
        function ScrolData(data){
            DivHeight=document.querySelector('.NewMesPrevievDiv')
            document.querySelector('.NewMesPreviev-JS').classList.remove('NewMesPreviev-Opacity')
            Rows=Math.round(data[0].Mess.Contnet.length/28)
            Actual=DivHeight.style.height=60;
            PlusValue=Rows*20;
            NewHeight=Actual+PlusValue;
            if(data[0].Mess.Contnet.length>28){
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
        $scope.RunChat=function(chat){
            if(Mobile.IfMobile){
                if(Chat.IfAbleToAdd(chat.UserID,$scope.ActiveChat)){
                    index=$scope.ActiveChat.push({
                        "inChat":[$scope.user],
                        "AddIconShow":false,
                        "SomeoneWriting":false,
                        "TyppingPerson":false,
                        "AddressShow":true,
                        "Chused":false,
                        "Letest":false
                    })
                    index=index-1;
                    $scope.SetUserChat(index,chat.UserID)
                }
            }else{
                model=document.querySelector('.NotReededMobileJS');
                model.style.top=-450;
                $scope.ActiveChat=chat
                $scope.SetUserChat(0,chat.UserID,'Mobile')
                
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
StartControlers.controller("MessagesController",['$scope','$http','Sesion','Socket','Messages','Componets','TimeConvert','$interval',function($scope,$http,Sesion,Socket,Messages,Componets,TimeConvert,$interval){
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
    var MarkasReeded = function(){    
        Socket.emit('MarkAsReeded',Messages.MarksAssReed($scope.messagesNormal),$scope.user)
    }
    var ClearAllMessages =function(){
        $scope.messages=Messages.ClearAllMessages();
        $scope.counts.AllMessages=Messages.CountAllMessages($scope.messages);    
        $scope.counts.NotreededMes=0;
    }
    let SentSelector = document.querySelector('.sent');
    let MarkasReededSelector = document.querySelector('.Reeded');
    SentSelector.addEventListener('click',function(e){
        sent();
    })
    MarkasReededSelector.addEventListener('click',function(e){
        MarkasReeded()
    })
    let ClearAllMessagesSelector = document.querySelector('.TrassClear');
    ClearAllMessagesSelector.addEventListener('click',function(e){
        ClearAllMessages();
    })
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
    ShowNotReeded=document.querySelector('.ShowNotReeded');
    ShowNotReeded.addEventListener('click',function(){

    })
}]);
