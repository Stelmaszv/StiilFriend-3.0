var StartControlers = angular.module("Url", []);
StartControlers.service("Post",['$http', function($http){
    this.Put = function (url, dataform) {
        var arrayurl = [];
        $http.post(url, dataform).success(function (data) {
            angular.forEach(data, function (item, key) {
                arrayurl.push(data)

            });
        }).error(function () {
            return this
        });

        return arrayurl;
    }
}]);