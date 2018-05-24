var url = angular.module("url", ["angular-storage"]);
url.service( 'PushUrl' , ['$http','store',function($http,store) { 
    this.Push = function(url){
        $http.get(url).then( function( Get ){
                $scope.Get=Get.data
        });
    }  
}]);