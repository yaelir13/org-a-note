app.controller("loginModalCtrl", function($scope, $location, user) {
    $scope.username = "leay.inori@gmail.com";
    $scope.password = "123";

    $scope.invalidLogin = false;

    $scope.login = function() {
        $scope.invalidLogin = false;
        user.login($scope.username, $scope.password).then(function() {
            // success login
            $location.path("/scores")
        }, function(error) {
            // failed login
            $scope.invalidLogin = true;
        })
    }
});