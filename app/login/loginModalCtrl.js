// app.controller("loginCtrl", function($scope, $location, user) {
    app.controller("loginCtrl", function($scope){    
    $scope.email = "leay.inor@gmail.com";
    $scope.pwd = "xxx";

    $scope.invalidLogin = false;

    // $scope.login = function() {
    //     $scope.invalidLogin = false;

    //     user.login($scope.email, $scope.pwd).then(function() {
    //         // success login
    //         $location.path("/scores")
    //     }, function(error) {
    //         // failed login
    //         $scope.invalidLogin = true;
    //     })
    // }
});