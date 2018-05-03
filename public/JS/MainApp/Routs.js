var app = angular.module("myApp", ["ngRoute","Start","angular-jwt"]);
app.config(function($routeProvider) {
        $routeProvider.when("/", {
                templateUrl : "TemplateAngular/start.htm",
        })    
});
