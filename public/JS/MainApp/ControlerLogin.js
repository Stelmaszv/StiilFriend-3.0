var StartControlers = angular.module("Start", ["Notification","Helpers","Translate","Url"]);
StartControlers.controller("login",['$scope','$http','Errors','Forms','Componets','Sesion','$location'
                                ,function($scope,$http,Errors,Forms,Componets,Sesion,$location){
    Componets.load();
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
}]);
StartControlers.controller("Start",['$scope','$http','Sesion',function($scope,$http,Sesion){
    $scope.Sesion=Sesion.SesionssStan;
        $scope.templates = [{
            name: 'main.htm',
            url: 'TemplateAngular/main.htm'},
        {name: 'register.htm',
         url: 'TemplateAngular/register.htm'},
        {name: 'configure.htm',
         url: 'TemplateAngular/configure.htm'}];
    if(!$scope.Sesion){
        $scope.template = $scope.templates[1];
    }else{
        if(Sesion.Tokken.configure){
            $scope.template = $scope.templates[2];
        }else{
            $scope.template = $scope.templates[0];
        }
    }                                                               
}]);
StartControlers.controller("register",['$scope','$http','Errors','Forms','Componets','Rerister','$interval','Post','Sesion',function($scope,$http,Errors,Forms,Componets,Rerister,$interval,Post,Sesion){
    Componets.load();
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
    var Register = function Register(){
        $scope.ErorrsRegisterValidate=false;
        $scope.EmptyFieldsRegister=[];
        $scope.ErorrsRegister=Rerister.Run($scope.RegisterForms,$scope.ErorrsRegister);
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
    keyup($scope.RegisterKeyUp[0]);
    keyup($scope.RegisterKeyUp[1]);
    keyup($scope.RegisterKeyUp[2]);
    let logingStart = document.querySelector('.RegisterStart');
    logingStart.addEventListener('click',function(){       
        Register();
    })
    $scope.$watch( function (){
        $scope.RegisterForms=[
            {value: $scope.login,           'name':'Login'                   , 'stan': false, 'required':true, 'type':'text','DBrow':'login' },
            {value: $scope.email,           'name':'Email'                   , 'stan': false, 'required':true, 'type':'email','DBrow':'email' },
            {value: $scope.password,        'name':'Hasło'                   , 'stan': false, 'required':true, 'type':'password','DBrow':'password' },
            {value: $scope.passwordrepeat,  'name':'Powtórz Hasło'           , 'stan': false, 'required':true,'type':'passwordMatch'},
            {value: $scope.regulation,      'name':'Zakceptuj Regulamin'      , 'stan': false, 'required':true, 'type':'checkbox' },
        ];
	});
}]);
StartControlers.controller("main",['$scope','$http','Sesion',function($scope,$http,Sesion){
    $scope.user=Sesion.Tokken;
    let logingStart = document.querySelector('.logout');
    logingStart.addEventListener('click',function(){       

        if(confirm('czy napewno chcesz sie wylogowac ?')){
            Sesion.Logout()
            location.reload()
        }
    })
}]);


