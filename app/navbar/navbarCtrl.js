app.controller("navbarCtrl", function($scope, user, $location) {

    // $scope.isUserLoggedIn = function() { 
    //     return false;
    // }

    $scope.isUserLoggedIn = function() {
        return user.isLoggedIn();
    }

    $scope.logout = function() {
        user.logout();
        $location.path("/");
    }

});