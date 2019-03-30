//Declare angular module
//ngRoute name of the module >> Add it to views
var app = angular.module('blogApp', ['ngRoute']);                

//*** Router Provider ***
app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: '/index.html',
            controller: 'HomeController',
            controllerAs: 'vm'
            })
  
        .when('/blogList', {
            templateUrl: '/blogList.html',
            controller : 'ListController',
            controllerAs: 'vm'
            })
  
        .when('/blogAdd', {
            templateUrl: '/blogAdd.html',
            controller: 'AddController',
            controllerAs: 'vm'
            })
            
        .when('/blogEdit/:id', {
            templateUrl: '/blogEdit.html',
            controller: 'EditController',
            controllerAs: 'vm'
            })

        .when('/blogDelete/:id', {
            templateUrl: '/blogDelete.html',
            controller: 'DeleteController',
            controllerAs: 'vm'
            })
	
	.otherwise({redirectTo: '/'});
      });

//*** Controllers ***
app.controller('HomeController', function HomeController() {
    var vm = this;
    vm.message = "Welcome to my Blog site!";
});

app.controller('ListController', function ListController() {
    var vm = this;
    vm.message = "Something goes here!";
});

app.controller('AddController', function AddController() {
    var vm = this;
    vm.message = "Welcome to my Blog site!";
});

app.controller('EditController', function EditController() {
    var vm = this;
    vm.message = "Welcome to my Blog site!";
});

app.controller('DeleteController', function DeleteController() {
    var vm = this;
    vm.message = "Welcome to my Blog site!";
});
