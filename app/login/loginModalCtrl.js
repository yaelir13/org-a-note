app.controller("loginModalCtrl", function($scope, $location, user) {
    $scope.email = "leay.inori@gmail.com";
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
        console.log("activeUser", $scope.activeUser);
        user.login($scope.email, $scope.pwd).then(function() {
            // success login
            // $scope.activeUser=activeUser;
            console.log("activeUser", $scope.activeUser);
            $location.path("/scores")
        }, function(error) {
            // failed login
            $scope.invalidLogin = true;
        })
    }
});