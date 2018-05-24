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
StartControlers.controller("MainController",['$scope','$http','Sesion','Socket','Messages','Notification','Componets','TimeConvert','$interval','$filter','Show',function($scope,$http,Sesion,Socket,Messages,Notification,Componets,TimeConvert,$interval,$filter,Show){
    if(Sesion.Tokken.login){
        Componets.loadMainCompnent();
        $scope.user=Sesion.Tokken; 
        $scope.counts={
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
        function MessagesSocket(){
            Socket.emit('request-messages',$scope.user)
            Socket.on('messages',function(data){
                loadMessages(data)
            })
            Socket.on('MarkAsReeded',function(data){
                $scope.messagesNormal=Messages.MarksAssReedRecived(data,$scope.messagesNormal)
                loadMessages($scope.messagesNormal)
            })
            Socket.on('AddMessages',function(data){
                if(Show.ShowMe(data)){
                    $scope.messagesNormal=Messages.Add(data,$scope.messagesNormal)
                    loadMessages($scope.messagesNormal)
                }
            })
            function loadMessages(data){
                messagess=[]
                $scope.messagesNormal=data;
                $scope.counts.NotreededMes=Messages.countNotReeded($scope.messagesNormal);
                messagess=Messages.Prepear($scope.messagesNormal,messagess)
                $scope.messages={
                    'NormalMessages':messagess,
                    'AllMessages'   :$scope.messagesNormal
                }
                $scope.counts.AllMessages=Messages.CountAllMessages($scope.messages);
                $scope.messages=Messages.SetMessages($scope.messages,35);
            }
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
        $scope.ClearNotifications=function(){
            $scope.notifications=Notification.ClearAllNotification();
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
                {"Click":'.Load-Notification-Click',"Active":'.MainMenuItem.Notification',"ActivSection":'.Load-Notification',"SectionName":'.Load-Section-notifications',"Url":'http://localhost:3000/messages'},
                {"Click":'.Load-Messages-Click',"Active":'.MainMenuItem.Messages',"ActivSection":'.Load-Messages',"SectionName":'.Load-Section-messages',"Url":'http://localhost:3000/messages'},
                {"Click":'.Load-Drapdown-Click',"Active":'.MainMenuItem.Drapdown',"ActivSection":'.Load-Drapdown',"SectionName":'.Load-Section-Drapdown'}
            ]    
            let LoadSection = document.querySelector($scope.ActiveElments[Elemnt].Click);
            if(screen.width<480){
                window.location =''+$scope.ActiveElments[Elemnt].Url+''
            }else{
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
            }
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
        Sesion.Logout();
        location.reload()
    }else{
       window.location.assign("#!/start") 
    }
}]);


