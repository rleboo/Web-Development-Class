//Declare angular module
//ngRoute name of the module >> Add it to views
var app = angular.module('blogApp', ['ngRoute']);                

//*** Router Provider ***
app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: '/homePage.html',
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
    vm.title = "Ray Leboo's Blog Site";
});

app.controller('ListController', function ListController($http) {
    var vm = this;
    vm.message = "Something goes here!";
<<<<<<< HEAD
    vm.blog = {}
    
=======
    vm.blog = {};    

>>>>>>> 8690ce22433a59386ad94edfd7e3bd6bb2050208
    getAllBlogs($http)
    .then(function successCallback(response) {
        vm.blog = response.data;
        vm.message = "Book data found!";
        console.log(vm.blog);
      }, function errorCallback(response) {
        vm.message = "Could not get list of books";
        console.log("Error!");
      });
});

app.controller('AddController', ['$http', '$location', function AddController($http, $location) {
    var vm = this;
    vm.message = "Add stuff";
    vm.submit = function() {             
    addBlogByID($http, {
        blog_title : userForm.blog_title.value,
        blog_text : userForm.blog_text.value
    })
    .then(function successCallback(response) {
        vm.message = "Blog Added!";
        console.log("Success!");
        $location.path('/blogList');
      }, function errorCallback(response) {
        vm.message = "Could not add blog";
        console.log("Error!")
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



