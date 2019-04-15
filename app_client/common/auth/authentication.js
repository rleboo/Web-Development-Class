var app = angular.module('blogApp');

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
