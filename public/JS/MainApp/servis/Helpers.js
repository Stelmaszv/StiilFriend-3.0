var Helpers = angular.module("Helpers", ["Notification","url"]);
Helpers.service( 'Componets' , [function() {
    this.load = function () {
        InputsNormal();
        loginMenu();
        navbar();
        formInputs();
        alertsDismissable();
        dropdown();
        modal();
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
              navbarMobileMenuButton.classList.add('clicked-button');
              $( menu ).slideDown( "slow");
              let clickedbuttons = document.querySelectorAll('.clicked-button');
              for (let clickedbutton of clickedbuttons) {
                    clickedbutton.addEventListener('click', function(e) {
                        $( menu ).slideUp( "slow");
                        navbarMobileMenuButton.classList.remove('clicked-button');
                    });
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
            setBodyMargin();
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
          let dropdownMenus = document.querySelectorAll('.dropdown');
          for (let dropdownMenu of dropdownMenus) {
            let dropdownMenuButton = dropdownMenu.querySelector('.dropdown-menu-button');
            dropdownMenuButton.addEventListener('click', function(e) {
              e.preventDefault();
              let menu = dropdownMenu.querySelector('.dropdown-menu');
              toggleFlex(menu);
            });
          }
     }
}]);
Helpers.service( 'Rerister' , ['Forms','Array','Errors','GetUrl',function(Forms,Array,Errors,GetUrl) {
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
                            Find=Array.Find(FormArray,'passwordMatch','Type');
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
    this.Find = function (array,field,place){
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
    this.SesionssStan=CheckToken();
    this.Tokken=ReturnTokken();
    this.CreateSession= function(Tokken){
        Tokken=jwtHelper.decodeToken(Tokken);
        Tokken=Tokken.result;
        if(!this.SesionssStan){
            angular.forEach(Tokken,function( item , key ){
                 store.set( 'Token' , Tokken[key] );
             });
        }
        
    }
    this.Logout= function(Tokken){
        store.remove( 'Token' );
    }
    function ReturnTokken(){
        return store.get('Token');
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