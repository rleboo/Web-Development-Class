//Declare angular module
//ngRoute name of the module >> Add it to views
var app = angular.module('blogApp', ['ngRoute']);                

//*** Router Provider ***
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'index.html',
            controller: 'HomeController',
            controllerAs: 'vm'
            })
  
        .when('/bookList', {
            templateUrl: 'pages/book-list.html',
            controller : 'ListController',
            controllerAs: 'vm'
            })
  
        .when('/bookAdd/', {
            templateUrl: 'pages/book-add.html',
            controller: 'AddController',
            controllerAs: 'vm'
            })
            
          .when('/blogEdit/:id', {
            templateUrl: 'pages/book-edit.html',
            controller: 'EditController',
            controllerAs: 'vm'
            })
  
        .otherwise({redirectTo: '/'});
      });

//*** Controllers ***
app.controller('HomeController', function HomeController() {
    var vm = this;
    vm.message = "Welcome to my Blog site!";
});
