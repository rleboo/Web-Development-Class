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

function deleteCommentByID($http, id, data)
{
    return $http.put('/api/commentRemove/' + id, data);
}

function addBlogByID($http, data, authentication)
{
    return $http.post('/api/blogs/', data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}

function deleteBlogByID($http, id, authentication) {
    return $http.delete('/api/blogs/' + id, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}

function addCommentById($http, id, data)
{
    return $http.put('api/blogComment/' + id, data);
}


//*** Compiler function ****

var buildCommentList = function(results) {
  var comments = [];
  results.forEach(function(obj) {
    comments.push({
      blog_title: obj.comment,
      name: obj.name,
      email: obj.email,
      _id: obj._id
    });
  });
  return comments;
};


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
    vm.comments = {};
    vm.currentAction = "display";

	
    vm.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }
	
    vm.currentUser = function()  {
        return authentication.currentUser();
    }
	
    vm.changeDisplay = function(idnum)  {
	vm.currentAction = idnum;
	console.log("This should have worked");
	console.log(idnum);
    }
    
    getBlogById($http, vm.id)
    .then(function successCallback(response) {
        vm.message = "Blog Returned";
	vm.blog = response.data;
	vm.comments = vm.blog.comment;
        console.log(response);
	console.log(vm.comments);	

    }, function errorCallback(response) {
        vm.message = "Could not add blog";
        console.log("Error!")
    });
    
      
    vm.submit = function() {
	console.log(userForm);
	console.log("Click works");
	addCommentById($http, vm.blog._id, {
	  email: vm.blog.email,
	  name: vm.blog.name,
	  comment: userForm.comment.value
	}, authentication)
	.then(function successCallback(response) {
            vm.message = "Blog Updated!";
            console.log("Comment Add Successful");
            $location.path('/blogList');
          }, function errorCallback(response) {
            vm.message = "Could not add blog";
            console.log("Error! Comment Did not Add")
          });
    }

    /*
    vm.commentDelete = function(comid) {
      console.log("Let's delete");
     
       deleteCommentByID($http, vm.blog._id, {
	commentid: comid
	})  
      .then(function successCallback(response) {
      vm.message = "Blog Returned";
      vm.blog = response.data;
      console.log(response);

    }, function errorCallback(response) {
        vm.message = "Could not add blog";
        console.log("Error!")
    });

    } */


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
    console.log(userForm);            
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



