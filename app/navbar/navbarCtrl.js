// app.controller("navbarCtrl", function($scope, user, $location) {
app.controller("navbarCtrl", function ($scope) {

    $scope.isUserLoggedIn = function() { 
        return false;
    }

    // $scope.isUserLoggedIn = function() {
    //     return user.isLoggedIn();
    // }

    // $scope.logout = function() {
    //     user.logout();
    //     $location.path("/");
    // }

});