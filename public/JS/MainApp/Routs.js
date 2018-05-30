var app = angular.module("myApp", ["Helpers","ngRoute","Start","angular-jwt","btford.socket-io","MainServis","filtrs","ngSanitize","MainPage"]);
app.config(function($routeProvider) {
        $routeProvider.when("/", {
            templateUrl : "TemplateAngular/main.htm",
        }) 
        $routeProvider.when("/start", {
            templateUrl : "TemplateAngular/register.htm",
        })
        $routeProvider.when("/loguat", {
            controller  :'loguat',
            templateUrl : "TemplateAngular/logout.htm"
        })
        $routeProvider.when("/profil/:id", {
            templateUrl : "TemplateAngular/ViewProfil.htm"
        })
});
