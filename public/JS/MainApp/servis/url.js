var url = angular.module("url", ["angular-storage"]);
url.service( 'GetUrl' , ['$http','store',function($http,store) { 
    this.Get = function(url){
            /*
            angular.forEach( loging ,function( item , key ){
                console.log(loging[key].data);
                varReturn.push(loging[key].data);
            });
            */
            var arrayurl=[];
            this.data=''
            $http.get(url).then( function( SQl ){
                if(SQl.data.length){
                    angular.forEach( SQl.data,function( item , key ){
                        this.data=item
                    });
                }else{
                    arrayurl=[]
                }
            })
            console.log(this.data)
    }  
}]);