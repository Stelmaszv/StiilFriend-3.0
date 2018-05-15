var app = angular.module("myApp", ["ngRoute","Start","angular-jwt","btford.socket-io","MainServis","filtrs"]);
app.config(function($routeProvider) {
        $routeProvider.when("/", {
                templateUrl : "TemplateAngular/start.htm",
        })    
});
