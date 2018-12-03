// app.controller("loginModalCtrl", function($scope, $location, user) {
    app.controller("loginModalCtrl", function($scope, $location){    
    $scope.email = "leay.inor@gmail.com";
    $scope.pwd = "xxx";

    $scope.invalidLogin = false;

    $scope.login = function() {
        $scope.invalidLogin = false;
        
        if ($scope.email === "leay.inor@gmail.com" && $scope.pwd === "xxx") {
            // success login
            $location.path("/scores")
        } else {
            // failed login
            $scope.invalidLogin = true;
        }
    }

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