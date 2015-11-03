var app = angular.module('routeAppControllers');
app.controller('PieController', ['$scope','$rootScope','$localStorage','$state','$stateParams', function($scope,$rootScope, $localStorage,$state,$stateParams){
    var side = $stateParams.side;
    console.log($localStorage.data)
    var data = JSON.parse($localStorage.data);
        if(side=="Server side") {
            var arr1=data[0].children ? data[0].children : data[0]._children;
            var arr2=data[1].children ? data[1].children : data[1]._children;
            $rootScope.pieData = arr1.concat(arr2);
        }else
                $rootScope.pieData=data;

    $rootScope.xFunction = function(){
        return function(d) {
            return d.name;
        };
    }
    $rootScope.yFunction = function(){
        return function(d) {
            return d.stargazers_count;
        };
    }
    $rootScope.y2Function = function(){
        return function(d) {
            return d.forks_count;
        };
    }
    $rootScope.y3Function = function(){
        return function(d) {
            return d.watchers_count;
        };
    }

}]);
