app.controller("loginModalCtrl", function($scope, $location, user) {
    $scope.username = "leay.inori@gmail.com";
    $scope.pwd = "xxx";

    $scope.invalidLogin = false;

    // $scope.login = function() {
    //     $scope.invalidLogin = false;
    //     debugger;
    //     if ($scope.email === "leay.inori@gmail.com" && $scope.pwd === "xxx") {
    //         // success login
    //         $location.path("/scores")
    //     } else {
    //         // failed login
    //         $scope.invalidLogin = true;
    //     }
    // }

    $scope.login = function() {
        $scope.invalidLogin = false;
        user.login($scope.username, $scope.pwd).then(function() {
            // success login
            $location.path("/scores")
        }, function(error) {
            // failed login
            $scope.invalidLogin = true;
        })
    }
});