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
	
	.when('/register', {
	    templateUrl: '/common/auth/register.html',
	    controller: 'RegisterController',
	    controllerAs: 'vm'
	    })
	
	.when('/login', {
	    templateUrl: '/common/auth/login.html',
	    controller: 'LoginController',
	    controllerAs: 'vm'
	    })
	.when('/blogDisplay/:id', {
	    templateUrl: '/display.html',
	    controller: 'DisplayController',
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

function updateBlogById($http, id, data, authentication) {
    return $http.put('/api/blogs/' + id, data , { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );

}

function addBlogByID($http, data, authentication)
{
    return $http.post('/api/blogs/', data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}

function deleteBlogByID($http, id, authentication) {
    return $http.delete('/api/blogs/' + id, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}


//*** Controllers ***
app.controller('HomeController', ['$location',  function HomeController($location) {
    var vm = this;
    vm.title = "Ray Leboo's Blog Site";
	
}]);

app.controller('DisplayController', ['$http', '$routeParams', '$location','authentication', function DisplayController($http, $routeParams, $location, authentication) {
    var vm = this;
    vm.blog = {}; 
    vm.id = $routeParams.id;
    vm.message = "Something goes here";
    
    vm.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }
	
    vm.currentUser = function()  {
        return authentication.currentUser();
    }
    
    getBlogById($http, vm.id)
    .then(function successCallback(response) {
        vm.message = "Blog Returned";
	vm.blog = response.data;
        console.log(response);

    }, function errorCallback(response) {
        vm.message = "Could not add blog";
        console.log("Error!")
    });
    

}]);


app.controller('ListController', ['$http', 'authentication', function ListController($http, authentication) {
    var vm = this;
    vm.message = "Something goes here!";
    vm.blog = {};

    vm.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }
	
    vm.currentUser = function()  {
        return authentication.currentUser();
    }    
    

    getAllBlogs($http)
    .then(function successCallback(response) {
        vm.blog = response.data;
        vm.message = "Book data found!";
        console.log(vm.blog);
      }, function errorCallback(response) {
        vm.message = "Could not get list of books";
        console.log("Error!");
      });
}]);

app.controller('AddController', ['$http', '$location', 'authentication',  function AddController($http, $location, authentication) {
    var vm = this;
    vm.message = "Add stuff";
    vm.submit = function() {
    console.log("I clicked it");
    vm.currentUser = function()  {
        return authentication.currentUser();
    }
    vm.data =  new Date().toString();
    console.log(Date.now);            
    addBlogByID($http, {
        blog_title : userForm.blog_title.value,
        blog_text : userForm.blog_text.value,
	email: vm.currentUser().email,
	name: vm.currentUser().name,
	createdOn: vm.data
    }, authentication)
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


app.controller('EditController', ['$http', '$routeParams', '$location', 'authentication', function EditController($http, $routeParams, $location, authentication) {
    var vm = this;
    vm.blog = {}; 
    vm.id = $routeParams.id;
    vm.message = "Something goes here";
    
    getBlogById($http, vm.id)
    .then(function successCallback(response) {
        vm.message = "Blog Returned";
	vm.blog = response.data;
        console.log(response);

    }, function errorCallback(response) {
        vm.message = "Could not add blog";
        console.log("Error!")
    });

    vm.submit = function() {             
        updateBlogById($http, vm.id, {
            blog_title : userForm.blog_title.value,
            blog_text : userForm.blog_text.value
        }, authentication)
        .then(function successCallback(response) {
            vm.message = "Blog Updated!";
            console.log("Put succesfull");
            $location.path('/blogList');
          }, function errorCallback(response) {
            vm.message = "Could not add blog";
            console.log("Error! Put not working")
          });
        }
}]);

app.controller('DeleteController', ['$http', '$routeParams', '$location', 'authentication',  function EditController($http, $routeParams, $location, authentication) {
    var vm = this;
    vm.blog = {}; 
    vm.id = $routeParams.id;
    vm.message = "Something goes here";
    
    getBlogById($http, vm.id)
    .then(function successCallback(response) {
        vm.message = "Blog Returned";
	    vm.blog = response.data;
        console.log(response);

    }, function errorCallback(response) {
        vm.message = "Could not add blog";
        console.log("Error!")
    });

    vm.submit = function() {             
        deleteBlogByID($http, vm.id, authentication)
        .then(function successCallback(response) {
            vm.message = "Blog Deleted!";
            console.log("delete succesful");
            $location.path('/blogList');
          }, function errorCallback(response) {
            vm.message = "Could not Delete";
            console.log("Error! Delete not working")
          });
    }
}]);



