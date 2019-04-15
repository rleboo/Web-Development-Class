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
	    templateUrl: '/register.html',
	    controller: 'RegisterController',
	    controllerAs: 'vm'
	    })
	
	.when('/login', {
	    templateUrl: '/login.html',
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


//*** Authentication Service and Methods **
app.service('authentication', authentication);
    authentication.$inject = ['$window', '$http'];
    function authentication ($window, $http) {
    
        var saveToken = function (token) {
            $window.localStorage['blog-token'] = token;
        };
                                       
        var getToken = function () {
            return $window.localStorage['blog-token'];
        };
        
        var register = function(user) {
            console.log('Registering user ' + user.email + ' ' + user.password);
            return $http.post('/api/register', user);
        };
     
        var login = function(user) {
           console.log('Attempting to login user ' + user.email + ' ' + user.password);
           return $http.post('/api/login', user);
        };
        
        var logout = function() {
            $window.localStorage.removeItem('blog-token');
        };
        
        var isLoggedIn = function() {
          var token = getToken();

          if(token){
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
          } else {
            return false;
          }
        };

        var currentUser = function() {
          if(isLoggedIn()){
            var token = getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return {
              email : payload.email,
              name : payload.name
            };
          }
        };

        return {
          saveToken : saveToken,
          getToken : getToken,
          register : register,
          login : login,
          logout : logout,
          isLoggedIn : isLoggedIn,
          currentUser : currentUser
        };
}


//*** Controllers ***
app.controller('HomeController', ['$location', 'authentication',  function HomeController($location, authentication) {
    var vm = this;
    vm.title = "Ray Leboo's Blog Site";
    vm.currentPath = $location.path();
    vm.currentUser = function()  {
        return authentication.currentUser();
    }
    vm.isLoggedIn = function() {
	console.log("User is logged in");
        return authentication.isLoggedIn();
    }
    vm.logout = function() {
      authentication.logout();
      $location.path('/');
    };
	
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


app.controller('LoginController', [ '$http', '$location', 'authentication', function LoginController($htttp, $location, authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Sign in to Blogger'
    };

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.returnPage = $location.search().page || '/';

    vm.submit = function () {
      vm.formError = "";
      if (!vm.credentials.email || !vm.credentials.password) {
           vm.formError = "All fields required, please try again";
        return false;
      } else {
           vm.doLogin();
      }
    };

    vm.doLogin = function() {
      vm.formError = "";
      authentication
        .login(vm.credentials)
        .then(function successCallBack(response){
	  console.log("This worked");
	  authentication.saveToken(response.token);
	  $location.search('page', null);
	  $location.path(vm.returnPage);
	 }, function errorCallBack(response) {
	  console.log("This is an error");
	  var obj = response;
          vm.formError = obj.message;
	});
    };
 }]);

app.controller('RegisterController', [ '$http', '$location', 'authentication', function RegisterController($htttp, $location, authentication) {
    var vm = this;
    
    vm.pageHeader = {
      title: 'Create a new Blooger account'
    };
    
    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };
    
    vm.returnPage = $location.search().page || '/';
    
    vm.submit = function () {
      vm.formError = "";
      if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
	console.log("Fuck it registered");
        vm.doRegister();
      }
    };

    vm.doRegister = function() {
	console.log("Fuck it didn't doRegister");
      vm.formError = "";
      authentication
        .register(vm.credentials)
        .then(function successCallback(response){
	  authentication.saveToken(response.token);	  
	  $location.search('page', null);
          $location.path(vm.returnPage);
        }, function errorCallBack(response){
	  vm.formError = "Error registering. Try again with a different email address."
          console.log("This is an error");      
        });
    };
}]);                    
                    

