var Helpers = angular.module("Helpers", ["Notification","url"]);
Helpers.service( 'Componets' , [function() {
    this.loadMainCompnent = function () {
        UnivaersalComponent();
    }
    this.loadSessinCompnent = function () {
        loginMenu();
        UnivaersalComponent();
    }
    function UnivaersalComponent(){
        InputsNormal();
        formInputs();
        alertsDismissable();
        tabs();
        modal();
        navbar()
    }
    function InputsNormal(){
        let Form = document.querySelectorAll('.form-input-normal');
        for (let input of Form) {
            let inputslist = input.querySelectorAll('input, textarea');
            for (let input of inputslist) {
              input.addEventListener('change', function(){
                input.classList.remove('inputError');
              });
              input.addEventListener('keyup', function(){
                input.classList.remove('inputError');
              });
              input.addEventListener('focus', function(){
                input.classList.remove('inputError');
              });
            }
        } 
    }
    function loginMenu(){
          let navbarMenuLogin = document.querySelectorAll('.loginsiteMenu');
          for(let item of navbarMenuLogin){
            item.addEventListener('mouseover',function(){       
                item.classList.add('login-site-hover');
            })
            item.addEventListener('click',function(){
            let itemSectionID=item.getAttribute('data-login-section');
                let LogonItemList = document.querySelectorAll('.loginsiteMenu');
                for(let itemLogin of LogonItemList){
                    itemSectionIDloop= itemLogin.getAttribute('data-login-section');
                    itemLogin.classList.remove('loginsite-active');
                    itemLogin.classList.add('loginsite-Notactive');
                    login=document.querySelector(itemSectionIDloop).style.display='none'
                }
                item.classList.remove('loginsite-Notactive');
                item.classList.add('loginsite-active');
                itemSectionID=document.querySelector(itemSectionID);
                $(itemSectionID).slideDown( "fast");
            })
            item.addEventListener('mouseleave',function(){
                item.classList.remove('login-site-hover');
            })
          }
    }
    function navbar() {
        let navbarMobileMenuButtons = document.querySelectorAll('.navbar-mobile-menu-button');
          for (let navbarMobileMenuButton of navbarMobileMenuButtons) {
            navbarMobileMenuButton.addEventListener('click', function(e) {
              e.preventDefault();
              let menu = document.querySelector(navbarMobileMenuButton.getAttribute('data-menu-id'));
                if(menu.style.display==''|| menu.style.display=='none' ){
                    navbarMobileMenuButton.classList.add('clicked-button');
                    $( menu ).slideDown( "slow");
                }else{
                    navbarMobileMenuButton.classList.remove('clicked-button');
                    $( menu ).slideUp( "slow");
                }
            });
          }
          let setBodyMargin = (function self() {
            if (document.querySelector('.navbar.fixed') !== null) {
              let navbarFixed = document.querySelector('.navbar.fixed');
              document.querySelector('body').style.marginTop = navbarFixed.clientHeight + 10 + 'px';
            }
            return self;
          })();

          window.addEventListener('resize', function() {
              let navbarMobileMenuButtons = document.querySelectorAll('.navbar-mobile-menu-button');
              for (let navbarMobileMenuButton of navbarMobileMenuButtons) {
                  let menu = document.querySelector(navbarMobileMenuButton.getAttribute('data-menu-id'));
                  if(menu.style.display!=''|| menu.style.display!='none' ){
                        $( menu ).slideUp( "slow");
                  }
              }
          });

          window.addEventListener('scroll', function() {
            if (document.querySelector('.navbar.fixed') !== null) {
              if (window.scrollY > 100) {
                document.querySelector('.navbar.fixed').classList.add('compact');
              } else {
                document.querySelector('.navbar.fixed').classList.remove('compact');
              }
            }
          });

    }
    function formInputs() {
      let formInputs = document.querySelectorAll('.form-input');
      for (let formInput of formInputs) {
        let inputs = formInput.querySelectorAll('input, textarea');
        for (let input of inputs) {
          input.addEventListener('change', function(){
            checkInputValue(formInput, input);
          });
          window.addEventListener('load', function(){
            checkInputValue(formInput, input);
          });
        }

      }
      function checkInputValue(formInput, input) {
        if (input.value !== '') {
          formInput.classList.add('not-empty-input');
        } else {
          formInput.classList.remove('not-empty-input');
        }
      }
    }
    function alertsDismissable() {
          let alerts = document.querySelectorAll('.alert.alert-dismissable');
          for (let alert of alerts) {
            alert.insertAdjacentHTML('beforeend', '<button type="button" class="close">&times;</button>');
            let closeBtn = alert.querySelector('.close');
            closeBtn.addEventListener('click', function(e){
              e.preventDefault();
              alert.className += ' alert-dismissed';
              setTimeout(function(){
                alert.style.display = 'none';
              }, 300);
            });
          }
    }
    function tabs() {
       let tabs = document.querySelectorAll('.tabs');
       for (let tab of tabs) {
            let menuItems = tab.querySelectorAll('.menu li a');
            let activeTab = tab.querySelector('.menu .active');
            let tabBodies = tab.querySelectorAll('.body > div');
            let i = 1;
            for (let tabBody of tabBodies) {
              tabBody.id = tab.id + '-tab-' + i++;
            }
            i = 1;
            for (let menuItem of menuItems) {
              menuItem.href = '#' + tab.id + '-tab-' + i++;
              menuItem.addEventListener('click', function(e) {
                e.preventDefault();
                let menuActiveItem = tab.querySelector('.menu .active');
                if (menuActiveItem !== null) {
                  menuActiveItem.classList.remove('active');
                  tab.querySelector('.body > .show').classList.remove('show');
                }
                menuItem.classList.add('active');
                tab.querySelector(menuItem.getAttribute('href')).classList.add('show');
              });
            }
            if (activeTab !== null) {
              let activeBodyItem = tab.querySelector('.body ' + activeTab.getAttribute('href'));
              activeBodyItem.classList.add('show');
            }
          }
    }
    function modal() {
        let modalButtons = document.querySelectorAll('[data-modal-id]');
        for (let modalButton of modalButtons) {
            let modalId = modalButton.getAttribute('data-modal-id');
            modalButton.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(modalId).style.display = 'flex';
                document.querySelector('body').style.overflow = 'hidden';
                setTimeout(function() {
                    document.querySelector(modalId).classList.add('show');
                }, 1);
            });
        }
        let modals = document.querySelectorAll('.modal');
        for (let modal of modals) {
            let closeButtons = modal.querySelectorAll('.close');
            for (let closeButton of closeButtons) {
              closeButton.addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.remove('show');
                document.querySelector('body').style.overflow = 'auto';
                setTimeout(function() {
                  modal.style.display = 'none';
                }, 300);
              });
            }
        }
    }
    function dropdown() {
        /*
        let dropdownMenus = document.querySelectorAll('.MainNavNavbarDrobdown');
        for (let dropdownMenu of dropdownMenus) {
            let dropdownMenuButton = dropdownMenu.querySelector('.MainNavNavbar-dropdown-menu-button');
            dropdownMenuButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log()
                dropdownMenu.classList.add('clicked-button','ActivSection','btn-radius-top');
                let switchItem = dropdownMenu.querySelector('.DropdownStan');
                //Dropdown-Menu-Div
                let DropDownMenu = dropdownMenu.querySelector('.Dropdown-Menu-Div');
                $(DropDownMenu).slideDown( "slow");
                let DopDownUp = dropdownMenu.querySelector('.DopDownUp');
                DopDownUp.addEventListener('click', function(e) {
                    $(DropDownMenu).slideUp( "slow");
                    dropdownMenuButton.classList.remove('clicked-button');
                    dropdownMenu.classList.remove('clicked-button','ActivSection','btn-radius-top');
                })
            })
        }
        */
     }
}]);
Helpers.service( 'Register' , ['Forms','Array','Errors',function(Forms,Array,Errors) {
    this.Run = function (FormArray,ErrorArray){
        EmptyForms=Forms.Empty(FormArray,ErrorArray);
        if(!EmptyForms){
            ErrorArray=Errors.ResetErors(ErrorArray)
            angular.forEach( FormArray ,function( item , key ){
                switch(FormArray[key].type){
                    case 'email':
                        Error=Errors.GetError(ErrorArray,'emailNot')
                        if(Forms.email(FormArray[key].value)){
                            ErrorArray[Error].value=false;
                        }else{
                            ErrorArray[Error].value=true;
                        }
                    break;
                    case 'password':
                       pass=Forms.PasswordStrength(FormArray[key].value)
                       if(pass!='bad'){
                            Error=Errors.GetError(ErrorArray,'passmath')
                            Find=Array.FaindField(FormArray,'passwordMatch','Type');
                            if(Forms.PasswordMatch(FormArray[key].value,FormArray[Find].value)){
                                ErrorArray[Error].value=false;
                            }else{
                                ErrorArray[Error].value=true;
                            }
                       }else{
                           Error=Errors.GetError(ErrorArray,'passweek')
                           ErrorArray[Error].value=true;
                       }
                    break;
                }
            });
        } 
        return ErrorArray;
    }
}]);
Helpers.service( 'Array' , [function() {
    this.FaindField = function (array,field,place){
        var FindField=''
        angular.forEach(array,function( item , key ){
            switch(place){
                case 'Type':
                    if(array[key].type==field){
                        FindField=key;
                    }
                break;
                case 'Name':
                    if(array[key].name==field){
                        FindField=key;
                    }
                break;
            }    
        });
        return FindField;
    }
    
    
}]);
Helpers.service( 'Sesion',['store', 'jwtHelper',function(store,jwtHelper){
    this.Tokken=ReturnTokken();
    this.CreateSession= function(Tokken){
        console.log(Tokken)
        store.set( 'Token' , Tokken );
    }
    this.Test=function(){
        store.get('user')
    }
    this.Logout= function(Tokken){
        store.remove( 'Token' );
    }
    function ReturnTokken(){
        if(store.get('Token')){
            Tokken=jwtHelper.decodeToken(store.get('Token'));
           return  Tokken.result[0]
        }else{
            return [];
        }
   

    }
    function CheckToken(){
        tokken = store.get( 'Token' )
        if(tokken!=null){
            return true;
        }else{
            return false;
        }
    }
}])
Helpers.factory('Socket',['socketFactory',function(socketFactory){
    return socketFactory();
}])
Helpers.service('TimeConvert',['$filter',function($filter){
    this.time=CreateTime();
    this.CreateTime=function(){
        return CreateTime();
    }
    function CreateTime(){
        var time= new Date();
        var year= time.getFullYear();
        var mount=time.getMonth();
        mount=mount+1;
        var day=time.getDate();
        var haur=time.getHours();
        var minuts=time.getMinutes();
        var secunds=time.getSeconds();
        ValuetoReturn=year+':'+convert(mount)+':'+convert(day)+':'+convert(haur)+':'+convert(minuts)+':'+convert(secunds)
        return ValuetoReturn;
    }
    function convert(value){
        if(value<10){
            return '0'+value;
        }else{
            return value;
        }
    }
    function ResrashTime (key,type){
        key=$filter('timestampToDate')(key,type);
        return key;
    }
    this.UpdateTime=function(array){
          angular.forEach(array, function (value, key) {
             // array[key].date=ResrashTime(array[key].date)
              array[key].Time=ResrashTime(array[key].date,'short')
              
          })
        return array

    }
}])