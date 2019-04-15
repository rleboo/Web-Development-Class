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
    return $http.put('/api/blogs/' + id, data , { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );

}

function addBlogByID($http, data)
{
    return $http.post('/api/blogs/', data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}

function deleteBlogByID($http, id) {
    return $http.delete('/api/blogs/' + id)
}


//*** Controllers ***
app.controller('HomeController', ['$location',  function HomeController($location) {
    var vm = this;
    vm.title = "Ray Leboo's Blog Site";
    console.log("fuck");
	
}]);

app.controller('ListController', function ListController($http) {
    var vm = this;
    vm.message = "Something goes here!";
    vm.blog = {};    

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


app.controller('EditController', ['$http', '$routeParams', '$location',  function EditController($http, $routeParams, $location) {
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
        })
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

app.controller('DeleteController', ['$http', '$routeParams', '$location',  function EditController($http, $routeParams, $location) {
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
        deleteBlogByID($http, vm.id)
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



