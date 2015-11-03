/*var routeApp = angular.module('routeApp', [
    // Dépendances du "module"
    'ngRoute',
    'routeAppControllers'
]);

routeApp.config(['$routeProvider',
    function($routeProvider) { 
        
        // Système de routage
        $routeProvider
        .when('/home', {
            templateUrl: '../home.html',
            controller: 'SalesController'
        })
       .when('/analytics', {
            templateUrl: '../details.html',
           // controller: 'SalesController'
        })
        .when('/details', {
            templateUrl: '../chart.html',
           // controller: 'SalesController'
        })
        .otherwise({
            redirectTo: '/home'
        });
    }
]);
    */

var routerApp = angular.module('routeApp', ['ui.router',
    'routeAppControllers']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: '../home.html',
            controller: 'SalesController'
        })

        // nested list with custom controller
        .state('home.details', {
            url: '/details/:side',
            templateUrl: '../details.html',
            controller: 'PieController'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('analytics', {
            url: '/analytics/:techno/:frmw',
            templateUrl:'../chart.html',
            controller : 'analyticsController'
        });

});