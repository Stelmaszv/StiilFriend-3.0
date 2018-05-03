(function formInputs() {

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

})();
(function alertsDismissable() {

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

})();
(function tabs() {

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

})();
(function modal() {

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

})();
(function navbar() {
  let navbarMobileMenuButtons = document.querySelectorAll('.navbar-mobile-menu-button');
  for (let navbarMobileMenuButton of navbarMobileMenuButtons) {
    navbarMobileMenuButton.addEventListener('click', function(e) {
      e.preventDefault();
      let menu = document.querySelector(navbarMobileMenuButton.getAttribute('data-menu-id'));
      toggleFlex(menu);
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
})();
(function dropdown() {

  let dropdownMenus = document.querySelectorAll('.dropdown');
  for (let dropdownMenu of dropdownMenus) {
    let dropdownMenuButton = dropdownMenu.querySelector('.dropdown-menu-button');
    dropdownMenuButton.addEventListener('click', function(e) {
      e.preventDefault();
      let menu = dropdownMenu.querySelector('.dropdown-menu');
      toggleFlex(menu);
    });
  }

})();
(function loginMenu(){
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
            document.querySelector(itemSectionIDloop).style.display='none'
            itemLogin.classList.remove('loginsite-active');
            itemLogin.classList.add('loginsite-Notactive');
        }
        itemSectionID=document.querySelector(itemSectionID).style.display='block';
        item.classList.remove('loginsite-Notactive');
        item.classList.add('loginsite-active');
    })
    item.addEventListener('mouseleave',function(){
        item.classList.remove('login-site-hover');
    })
  }
})();
(function InputsNormal(){
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
})();
function toggleFlex(element) {
  if (getComputedStyle(element).display === 'none') {
    element.style.display = 'flex';
  } else {
    element.style.display = null;
  }
}

