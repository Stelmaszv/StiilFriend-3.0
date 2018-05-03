var filtrs = angular.module('Translate', []);
filtrs.filter('TranslatePasswordErorr',function(){
    return function (value){
       var passwordstan=''
       switch(value){
           case 'bad':
             passwordstan='Hasło jest za słabe !';
           break;
           case 'week':
             passwordstan='Hasło jest słabe';
           break;
           case 'good':
             passwordstan='Hasło jest mocne';
           break;
           case 'strong':
             passwordstan='Hasło jest bardzo mocne';
           break;
       }
       return passwordstan
    }
})