//Declare angular module
//ngRoute name of the module >> Add it to views
var app = angular.module('blogApp', ['ngRoute']);                

//*** Router Provider ***
app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: '/homepage.html',
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


//*** REST Web API functions ***
function getAllBlogs($http) {
    return $http.get('/api/blogs');
}

function getBlogById($http, id) {
    return $http.get('/api/blogs/' + id);
}

function updateBlogById($http, id, data) {
    return $http.put('/api/blogs/' + id, data);
}

function addBlogByID($http, data)
{
    return $http.post('/api/blogs/', data);
}


//*** Controllers ***
app.controller('HomeController', function HomeController() {
    var vm = this;
    vm.message = "Welcome to my Blog site!";
});

app.controller('ListController', function ListController() {
    var vm = this;
    vm.message = "Something goes here!";

    getAllBlogs($http)
      .success(function(data) {
        vm.blog = data;
        vm.message = "Book data found!";
      })
      .error(function (e) {
        vm.message = "Could not get list of books";
      });
});

app.controller('AddController', ['$http', '$state', function AddController($http, $state) {
    var vm = this;
    vm.message = "Add stuff";
    vm.submit = function() {             
    addBlogByID($http, {
        blog_title : userForm.blog_title.value,
        blog_text : userForm.blog_text.value
    })
          .success(function(data) {
            vm.message = "Blog Added!";
            $state.go('blogList');   // Refer to book for info on StateProvder
          })
          .error(function (e) {
            vm.message = "Could not add blog";
          });
    }
}]);


app.controller('EditController', function EditController() {
    var vm = this;
    vm.message = "Welcome to my Blog site!";
});

app.controller('DeleteController', function DeleteController() {
    var vm = this;
    vm.message = "Welcome to my Blog site!";
});



